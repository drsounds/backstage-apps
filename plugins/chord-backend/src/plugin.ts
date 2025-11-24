import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './router';
import { todoListServiceRef } from './services/TodoListService';

/**
 * chordPlugin backend plugin
 *
 * @public
 */
import { ScmIntegrations } from '@backstage/integration';

export const chordPlugin = createBackendPlugin({
  pluginId: 'chord',
  register(env) {
    env.registerInit({
      deps: {
        httpAuth: coreServices.httpAuth,
        httpRouter: coreServices.httpRouter,
        todoList: todoListServiceRef,
        discovery: coreServices.discovery,
        config: coreServices.rootConfig,
      },
      async init({ httpAuth, httpRouter, todoList, discovery, config }) {
        const scmIntegrations = ScmIntegrations.fromConfig(config);
        httpRouter.use(
          await createRouter({
            httpAuth,
            todoList,
            discovery,
            scmIntegrations,
          }),
        );
      },
    });
  },
});
