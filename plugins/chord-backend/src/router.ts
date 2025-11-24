import { HttpAuthService, DiscoveryService } from '@backstage/backend-plugin-api';
import { InputError } from '@backstage/errors';
import { z } from 'zod';
import express from 'express';
import Router from 'express-promise-router';
import { todoListServiceRef } from './services/TodoListService';
import { ScaffolderClient } from '@backstage/plugin-scaffolder-common';
import { ScmIntegrations } from '@backstage/integration';

export async function createRouter({
  httpAuth,
  todoList,
  discovery,
  scmIntegrations,
}: {
  httpAuth: HttpAuthService;
  todoList: typeof todoListServiceRef.T;
  discovery: DiscoveryService;
  scmIntegrations: ScmIntegrations;
}): Promise<express.Router> {
  const router = Router();
  router.use(express.json());

  // TEMPLATE NOTE:
  // Zod is a powerful library for data validation and recommended in particular
  // for user-defined schemas. In this case we use it for input validation too.
  //
  // If you want to define a schema for your API we recommend using Backstage's
  // OpenAPI tooling: https://backstage.io/docs/next/openapi/01-getting-started
  const todoSchema = z.object({
    title: z.string(),
    entityRef: z.string().optional(),
  });

  router.post('/todos', async (req, res) => {
    const parsed = todoSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new InputError(parsed.error.toString());
    }

    const result = await todoList.createTodo(parsed.data, {
      credentials: await httpAuth.credentials(req, { allow: ['user'] }),
    });

    res.status(201).json(result);
  });

  router.get('/todos', async (_req, res) => {
    res.json(await todoList.listTodos());
  });

  router.get('/todos/:id', async (req, res) => {
    res.json(await todoList.getTodo({ id: req.params.id }));
  });

  router.post('/repo', async (req, res) => {
    const { name, description, files } = req.body;

    const scaffolder = new ScaffolderClient({
      discoveryApi: discovery,
      fetchApi: { fetch: fetch as any },
      scmIntegrationsApi: scmIntegrations,
    });

    const result = await scaffolder.scaffold({
      templateRef: 'default:template/ai-template',
      values: {
        name,
        description,
        files,
      },
    });
    res.json({ ok: true, taskId: result.taskId });
  })
  return router;
}
