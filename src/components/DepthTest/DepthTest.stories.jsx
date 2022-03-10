/**
 * DepthTest.jsx
 */
 import * as React from 'react';

 // Component(s)
 import DepthTest from './DepthTest';

 export default {
   title: 'DepthTest',
   component: DepthTest,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <DepthTest />;

 Default.storyName = 'default';
