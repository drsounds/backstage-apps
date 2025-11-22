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
      },
    });
  },
});
