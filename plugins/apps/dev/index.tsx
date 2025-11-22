import { createDevApp } from '@backstage/dev-utils';
import { appsPlugin, AppsPage } from '../src/plugin';

createDevApp()
  .registerPlugin(appsPlugin)
  .addPage({
    element: <AppsPage />,
    title: 'Root Page',
    path: '/apps',
  })
  .render();
