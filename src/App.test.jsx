import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';


import store from './store/index';
import App from './App';
import axios from './axiosApi.ts';

const mock = new MockAdapter(axios);

mock.onGet('http://localhost:3000/posts?_sort=date&_order=desc').reply(200,
  [{
    id: 'yxzyjf7dj',
    priority: 'medium',
    title: 'New task',
    message: 'Mussum Ipsum, cacilds vidis litro abertis. Diuretics paradis num copo é motivis de denguis. Em pé sem cair, deitado sem dormir, sentado sem cochilar e fazendo pose. Per aumento de cachacis, eu reclamis. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.',
    date: 1590655786389,
  },
  {
    id: 'hu2urigct',
    priority: 'low',
    title: 'Make a test',
    message: 'Mussum Ipsum, cacilds vidis litro abertis. Cevadis im ampola pa arma uma pindureta. Per aumento de cachacis, eu reclamis.  Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Paisis, filhis, espiritis santis.',
    date: 1590575739007,
  },
  {
    id: 'c6jp8oa3k',
    priority: 'medium',
    title: 'Make a beer again',
    message: 'Mussum Ipsum, cacilds vidis litro abertis. Cevadis im ampola pa arma uma pindureta. Per aumento de cachacis, eu reclamis.  Praesent vel viverra nisi. Mauris aliquet nunc non turpis scelerisque, eget. Paisis, filhis, espiritis santis.',
    date: 1590655795576,
  }]);

mock.onPost('http://localhost:3000/posts').replyOnce(200);

test('The forms validation is showing', async () => {
  const { getAllByText, getByText } = render(<Provider store={store}><App /></Provider>);
  await waitFor(() => expect(getByText('New Post')).toBeInTheDocument());
  await act(async () => fireEvent.click(getByText('Create')));
  expect(getAllByText('Is required').length).toBe(3);
});

test('Contains a row for each post in the list from the API response', async () => {
  const { getAllByTestId, getByTestId } = render(<Provider store={store}><App /></Provider>);
  await waitFor(() => expect(getByTestId('post-list')).toBeInTheDocument());
  expect(getAllByTestId('post-card').length).toEqual(3);
});

test('The form contains the fields', async () => {
  const { getByTestId } = render(<Provider store={store}><App /></Provider>);
  await waitFor(() => expect(getByTestId('priority-field' && 'title-field' && 'message-field')).toBeInTheDocument());
});

test('Contains a row for each post in the list from the API response', async () => {
  const { getAllByTestId, getByTestId, getByText } = render(<Provider store={store}><App /></Provider>);
  await waitFor(() => expect(getByTestId('post-list')).toBeInTheDocument());
  expect(getAllByTestId('post-card').length).toEqual(3);
  fireEvent.click(getByText('New task'));
  await waitFor(() => expect(getByTestId('priority-filled-field')).toHaveValue());
  expect(getByTestId('title-filled-field')).toHaveValue();
  expect(getByTestId('message-filled-field')).toHaveValue();
});

test('The form submit the correct data', async () => {
  const { getAllByTestId, getByTestId, getByText } = render(<Provider store={store}><App /></Provider>);
  await waitFor(() => expect(getByTestId('post-list')).toBeInTheDocument());
  expect(getAllByTestId('post-card').length).toEqual(3);
  await act(async () => fireEvent.click(getByTestId('render-post-view')));
  expect(getByText('New Post')).toBeInTheDocument();
  await act(async () => fireEvent.change(getByTestId('priority-field'), { target: { value: 'high' } }));
  await act(async () => userEvent.type(getByTestId('title-field'), 'Max'));
  await act(async () => userEvent.type(getByTestId('message-field'), 'The best candidate for your company =D'));
  await act(async () => fireEvent.click(getByText('Create')));
  expect(mock.history.post.length).toBe(1);
  expect(mock.history.post[0].data).toContain('high' && 'Max' && 'The best candidate for your company =D');
  // await act(async () => expect(getAllByTestId('post-card').length).toEqual(4));
});
