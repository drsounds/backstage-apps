import { InputError } from '@backstage/errors';
import { z } from 'zod';
import express from 'express';
import Router from 'express-promise-router';
import { appsServiceRef } from './services/AppsService';

export async function createRouter({
  apps,
}: {
  apps: typeof appsServiceRef.T;
}): Promise<express.Router> {
  const router = Router();
  router.use(express.json());

  const appSchema = z.object({
    slug: z.string(),
    name: z.string(),
    embed_url: z.string(),
    description: z.string(),
    released: z.string(),
    user_uri: z.string(),
    tags: z.array(z.string()),
    icon_url: z.string(),
    header_image_url: z.string(),
    vendor_uri: z.string(),
    category_uri: z.string(),
    website_url: z.string(),
  });

  router.post('/apps', async (req, res) => {
    const parsed = appSchema.safeParse(req.body);
    if (!parsed.success) {
      throw new InputError(parsed.error.toString());
    }

    const result = await apps.createApp(parsed.data);
    res.status(201).json(result);
  });

  router.get('/apps', async (_req, res) => {
    res.json(await apps.listApps());
  });

  router.get('/apps/:slug', async (req, res) => {
    res.json(await apps.getApp(req.params.slug));
  });

  return router;
}
