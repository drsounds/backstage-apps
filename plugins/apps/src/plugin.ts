import {
  createPlugin,
  createRoutableExtension,
  createApiFactory,
  discoveryApiRef,
  fetchApiRef,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import { appsApiRef, AppsClient } from './api/AppsClient';

export const appsPlugin = createPlugin({
  id: 'apps',
  routes: {
    root: rootRouteRef,
  },
  apis: [
    createApiFactory({
      api: appsApiRef,
      deps: { discoveryApi: discoveryApiRef, fetchApi: fetchApiRef },
      factory: ({ discoveryApi, fetchApi }) =>
        new AppsClient({ discoveryApi, fetchApi }),
    }),
  ],
});

export const AppsPage = appsPlugin.provide(
  createRoutableExtension({
    name: 'AppsPage',
    component: () =>
      import('./components/AppsPage/AppsPage').then(m => m.AppsPage),
    mountPoint: rootRouteRef,
  }),
);
