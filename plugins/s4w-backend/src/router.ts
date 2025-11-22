import { HttpAuthService } from '@backstage/backend-plugin-api';
import { InputError } from '@backstage/errors';
import { z } from 'zod';
import express from 'express';
import Router from 'express-promise-router';
import { todoListServiceRef } from './services/TodoListService';
import { shiftServiceRef } from './services/ShiftService';

export async function createRouter({
  httpAuth,
  todoList,
  shiftService,
}: {
  httpAuth: HttpAuthService;
  todoList: typeof todoListServiceRef.T;
  shiftService: typeof shiftServiceRef.T;
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

  const shiftSchema = z.object({
    commitment_uri: z.string(),
    duration_ms: z.number(),
    project_uri: z.string(),
    worked: z.string(), // timestamp
    user_uri: z.string(),
    tags: z.array(z.string()).default(['tag1', 'tag2']),
    unit_amount: z.number().default(500),
    currency: z.string().default('SEK'),
    customer_uri: z.string(),
  });

  router.post('/shifts', async (req, res) => {
    const parsed = shiftSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new InputError(parsed.error.toString());
    }

    const result = await shiftService.createShift(parsed.data);
    res.status(201).json(result);
  });

  router.get('/shifts', async (_req, res) => {
    res.json(await shiftService.listShifts());
  });

  router.get('/shifts/:id', async (req, res) => {
    res.json(await shiftService.getShift(req.params.id));
  });

  router.put('/shifts/:id', async (req, res) => {
    const parsed = shiftSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new InputError(parsed.error.toString());
    }

    const result = await shiftService.updateShift(req.params.id, parsed.data);
    res.json(result);
  });

  router.delete('/shifts/:id', async (req, res) => {
    await shiftService.deleteShift(req.params.id);
    res.status(204).end();
  });

  return router;
}
