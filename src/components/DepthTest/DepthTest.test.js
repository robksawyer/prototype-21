/**
 * @file DepthTest.test.jsx
 *
 * Jest expect documentation
 * @url https://jestjs.io/docs/expect
 *
 * React Testing Library documentation
 * @url https://testing-library.com/docs/
 */
 import * as React from 'react'
 import { render, screen } from '@testing-library/react';
 import userEvent from '@testing-library/user-event';

 // Component to test
 import DepthTest from './DepthTest.jsx'

 test('is truthy', () => {
   expect(true).toBeTruthy();
 })
