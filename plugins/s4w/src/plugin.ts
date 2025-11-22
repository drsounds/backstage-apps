import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const s4WPlugin = createPlugin({
  id: 's4w',
  routes: {
    root: rootRouteRef,
  },
});

export const S4WPage = s4WPlugin.provide(
  createRoutableExtension({
    name: 'S4WPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
