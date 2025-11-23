import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const chordPlugin = createPlugin({
  id: 'chord',
  routes: {
    root: rootRouteRef,
  },
});

export const ChordPage = chordPlugin.provide(
  createRoutableExtension({
    name: 'ChordPage',
    component: () =>
      import('./components/VibeCodingComponent/VibeCodingComponent').then(m => m.VibeCodingComponent),
    mountPoint: rootRouteRef,
  }),
);
