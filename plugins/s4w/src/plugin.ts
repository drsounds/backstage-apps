import {
  createPlugin,
  createRoutableExtension,
  createApiFactory,
  discoveryApiRef,
  fetchApiRef,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import { shiftApiRef, ShiftClient } from './api/ShiftClient';

export const s4WPlugin = createPlugin({
  id: 's4w',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: shiftApiRef,
      deps: { discoveryApi: discoveryApiRef, fetchApi: fetchApiRef },
      factory: ({ discoveryApi, fetchApi }) =>
        new ShiftClient({ discoveryApi, fetchApi }),
    }),
  ],
});

export const S4WPage = s4WPlugin.provide(
  createRoutableExtension({
    name: 'S4WPage',
    component: () =>
      import('./components/ShiftPage/ShiftPage').then(m => m.ShiftPage),
    mountPoint: rootRouteRef,
  }),
);
