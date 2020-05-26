import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const initialState = { posts: [], isLoadingPosts: false, isSavingPost: false };

// ACTION TYPES
export const CHANGE_VIEW_MODE = 'CHANGE_VIEW_MODE';
export const SET_POSTS = 'SET_POSTS';
export const SET_IS_LOADING_POSTS = 'SET_IS_LOADING_POSTS';
export const SET_IS_SAVING_POST = 'SET_IS_SAVING_POST';

// ACTIONS
export const changeViewMode = (viewMode) => ({
  type: CHANGE_VIEW_MODE,
  payload: viewMode,
});

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


// ASYNC ACTIONS - fetch, create, save and delete
export const fetchPosts = () => async (dispatch) => {
  dispatch(setIsLoadingPosts(true)); // { type: 'SET_IS_LOADING_POSTS', payload: true }
  try {
    const response = await axios.get('http://localhost:3000/posts');
    dispatch(setPosts(response.data));
  } catch (error) {
    console.log(error);
  }
  dispatch(setIsLoadingPosts(false));
};

export const createPost = (postDetails) => async (dispatch) => {
  dispatch(setIsSavingPost(true));
  try {
    await axios.post('http://localhost:3000/posts', postDetails);
    await dispatch(fetchPosts());
  } catch (error) {
    console.log(error);
  }
  dispatch(setIsSavingPost(false));
};


// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_VIEW_MODE:
      return state.isLoadingPosts;
    case SET_IS_LOADING_POSTS:
      return { ...state, isLoadingPosts: action.payload };
    case SET_IS_SAVING_POST:
      return { ...state, isSavingPost: action.payload };
    case SET_POSTS:
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};


export default createStore(reducer, applyMiddleware(thunk));
