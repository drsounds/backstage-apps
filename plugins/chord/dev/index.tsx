import { createDevApp } from '@backstage/dev-utils';
import { chordPlugin, ChordPage } from '../src/plugin';

createDevApp()
  .registerPlugin(chordPlugin)
  .addPage({
    element: <ChordPage />,
    title: 'Root Page',
    path: '/chord',
  })
  .render();
