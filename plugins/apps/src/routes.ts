import { createRouteRef } from '@backstage/core-plugin-api';

export const rootRouteRef = createRouteRef({
  id: 'apps',
});

export const appRouteRef = createRouteRef({
  id: 'apps:app',
});
