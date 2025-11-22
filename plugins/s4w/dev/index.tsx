import { createDevApp } from '@backstage/dev-utils';
import { s4WPlugin, S4WPage } from '../src/plugin';

createDevApp()
  .registerPlugin(s4WPlugin)
  .addPage({
    element: <S4WPage />,
    title: 'Root Page',
    path: '/s4w',
  })
  .render();
