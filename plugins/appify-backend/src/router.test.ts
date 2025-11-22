import { mockServices } from '@backstage/backend-test-utils';
import express from 'express';
import request from 'supertest';
import { createRouter } from './router';
import { AppsService } from './services/AppsService';

describe('createRouter', () => {
  let app: express.Express;

  beforeAll(async () => {
    const router = await createRouter({
      apps: AppsService.create({ logger: mockServices.logger.mock() }),
    });
    app = express().use(router);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('GET /apps', () => {
    it('returns empty list initially', async () => {
      const response = await request(app).get('/apps');

      expect(response.status).toEqual(200);
      expect(response.body).toEqual({ items: [] });
    });
  });

  describe('POST /apps', () => {
    it('creates an app', async () => {
      const input = {
        slug: 'test-app',
        name: 'Test App',
        embed_url: 'https://example.com/embed',
        description: 'A test app',
        released: '2023-10-27T10:00:00Z',
        user_uri: 'spacify:user:123',
        tags: ['tag1', 'tag2'],
        icon_url: 'https://example.com/icon.png',
        header_image_url: 'https://example.com/header.png',
        vendor_uri: 'spacify:vendor:456',
        category_uri: 'spacify:category:789',
        website_url: 'https://example.com',
      };

      const response = await request(app).post('/apps').send(input);

      expect(response.status).toEqual(201);
      expect(response.body).toEqual(input);
    });
  });
});
