import React from 'react';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';

import store from './store/index';

import App from './App';

import '@testing-library/jest-dom';


// test('With React Testing Library', () => {
//   const initialState = { output: 10 };
//   const mockStore = configureStore();
 
// });

test('No post cards have been rendered"', () => {
  const { container } = render(<Provider store={store}><App /></Provider>);
  const postElements = container.querySelectorAll('.post-card');
  expect(postElements.length).toBe(0);
});


