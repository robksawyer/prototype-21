/**
 * R3fGlitchHover.jsx
 */
 import * as React from 'react';

 // Component(s)
 import R3fGlitchHover from './R3fGlitchHover';

 export default {
   title: 'R3fGlitchHover',
   component: R3fGlitchHover,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <R3fGlitchHover />;

 Default.storyName = 'default';
