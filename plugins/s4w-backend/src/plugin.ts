import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './router';
import { todoListServiceRef } from './services/TodoListService';
import { shiftServiceRef } from './services/ShiftService';

/**
 * s4WPlugin backend plugin
 *
 * @public
 */
export const s4WPlugin = createBackendPlugin({
  pluginId: 's4w',
  register(env) {
    env.registerInit({
      deps: {
        httpAuth: coreServices.httpAuth,
        httpRouter: coreServices.httpRouter,
        todoList: todoListServiceRef,
        shiftService: shiftServiceRef, // Added dependency
      },
      async init({ httpAuth, httpRouter, todoList, shiftService }) { // Added shiftService to destructuring
        httpRouter.use(
          await createRouter({
            httpAuth,
            todoList,
            shiftService, // Added shiftService to createRouter arguments
          }),
        );
      },
    });
  },
});
