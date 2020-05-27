/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

// UTILS
const generateId = () => Math.random().toString(36).substr(2, 9);

const initialState = {
  posts: [], isLoadingPosts: false, isSavingPost: false, currentPost: {}, isLoadingPost: false,
};


// ACTION TYPES
export const SET_POSTS = 'SET_POSTS';
export const SET_IS_LOADING_POSTS = 'SET_IS_LOADING_POSTS';
export const SET_IS_SAVING_POST = 'SET_IS_SAVING_POST';
export const SET_CURRENT_POST = 'SET_CURRENT_POST';
export const SET_IS_LOADING_POST = 'SET_IS_LOADING_POST';

// ACTIONS

export const setIsLoadingPosts = (value) => ({
  type: SET_IS_LOADING_POSTS,
  payload: value,
});

export const setPosts = (posts) => ({
  type: SET_POSTS,
  payload: posts,
});

export const setIsSavingPost = (value) => ({
  type: SET_IS_SAVING_POST,
  payload: value,
});

export const setCurrentPost = (post = {}) => ({
  type: SET_CURRENT_POST,
  payload: post,
});

export const setIsLoadingPost = (value) => ({
  type: SET_IS_LOADING_POST,
  payload: value,
});


// ASYNC ACTIONS - fetch, create, save and delete
export const fetchPosts = () => async (dispatch) => {
  dispatch(setIsLoadingPosts(true)); // { type: 'SET_IS_LOADING_POSTS', payload: true }
  try {
    const response = await axios.get('http://localhost:3000/posts?_sort=date&_order=desc');
    dispatch(setPosts(response.data));
  } catch (error) {
    console.log(error);
  }
  dispatch(setIsLoadingPosts(false));
};

export const createPost = (postDetails) => async (dispatch) => {
  dispatch(setIsSavingPost(true));
  try {
    await axios.post('http://localhost:3000/posts', { ...postDetails, id: generateId() });
    dispatch(fetchPosts());
  } catch (error) {
    console.log(error);
  }
  dispatch(setIsSavingPost(false));
};

export const editPost = (postDetails) => async (dispatch) => {
  dispatch(setIsSavingPost(true));
  try {
    await axios.put(`http://localhost:3000/posts/${postDetails.id}`, postDetails);
    dispatch(fetchPosts());
    dispatch(setCurrentPost(postDetails));
  } catch (error) {
    console.log(error);
  }
  dispatch(setIsSavingPost(false));
};

export const onSetCurrentPost = (post) => async (dispatch) => {
  dispatch(setIsLoadingPost(true));
  dispatch(setCurrentPost(post));
  setTimeout(() => dispatch(setIsLoadingPost(false)), 1000);
};

// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_LOADING_POSTS:
      return { ...state, isLoadingPosts: action.payload };
    case SET_IS_SAVING_POST:
      return { ...state, isSavingPost: action.payload };
    case SET_POSTS:
      return { ...state, posts: action.payload };
    case SET_CURRENT_POST:
      return { ...state, currentPost: action.payload };
    case SET_IS_LOADING_POST:
      return { ...state, isLoadingPost: action.payload };
    default:
      return state;
  }
};


// eslint-disable-next-line max-len
export default createStore(reducer, applyMiddleware(thunk));
