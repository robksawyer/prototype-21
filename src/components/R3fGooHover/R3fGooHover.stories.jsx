/**
 * R3fGooHover.jsx
 */
 import * as React from 'react';

 // Component(s)
 import R3fGooHover from './R3fGooHover';

 export default {
   title: 'R3fGooHover',
   component: R3fGooHover,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <R3fGooHover />;

 Default.storyName = 'default';
