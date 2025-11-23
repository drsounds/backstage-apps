import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './router';
import { appsServiceRef } from './services/AppsService';

/**
 * appifyBackendPlugin
 *
 * @public
 */
export const appifyBackendPlugin = createBackendPlugin({
  pluginId: 'appify',
  register(env) {
    env.registerInit({
      deps: {
        httpAuth: coreServices.httpAuth,
        httpRouter: coreServices.httpRouter,
        apps: appsServiceRef,
      },
      async init({ httpRouter, apps }) {
        httpRouter.use(
          await createRouter({
            apps,
          }),
        );

        if (process.env.NODE_ENV === 'development') {
          try {
            await apps.createApp({
              slug: 'testapp',
              embed_url: 'http://localhost:3009',
              name: 'Testapp',
              vendor_uri: 'spacify:vendor:spacify',
              user_uri: 'spacify:user:drsounds',
              description: 'A test app',
              released: new Date().toISOString(),
              tags: ['test', 'demo'],
              icon_url: '',
              header_image_url: '',
              category_uri: 'spacify:category:utility',
              website_url: 'http://localhost:3009',
            });
            console.log('Seeded test app: testapp');
          } catch (e) {
            console.warn('Failed to seed test app (might already exist):', e);
          }
        }
      },
    });
  },
});
