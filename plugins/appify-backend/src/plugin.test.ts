import {
  startTestBackend,
} from '@backstage/backend-test-utils';
import { appifyBackendPlugin } from './plugin';
import request from 'supertest';

describe('plugin', () => {
  it('should start', async () => {
    const { server } = await startTestBackend({
      features: [appifyBackendPlugin],
    });

    await request(server).get('/api/appify/apps').expect(200);
  });
});
