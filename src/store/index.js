import { createStore } from 'redux';
import axios from 'axios';

const initialState = { posts: [], isLoadingPosts: false };

// ACTION TYPES
export const CHANGE_VIEW_MODE = 'CHANGE_VIEW_MODE';
export const CREATE_POST = 'CREATE_POST';
export const SAVE_POST = 'SAVE_POST';
export const DELETE_POST = 'DELETE_POST';
export const SET_IS_LOADING_POSTS = 'SET_IS_LOADING_POSTS';


// ACTIONS
export const changeViewMode = (viewMode) => ({
  type: CHANGE_VIEW_MODE,
  payload: viewMode,
});

export const setIsLoadingPosts = (value) => ({
  type: CHANGE_VIEW_MODE,
  payload: value,
});

// ASYNC ACTIONS - fetch, create, save and delete
export const fetchPosts = () => async (dispatch) => {
  dispatch(setIsLoadingPosts(true));
  axios.get('http://localhost:3000/posts')
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
    // INCLUIR UM SETTIMEOUT??? COMO FAZ PARA NEGAR O ISLOADING ATE QUE A CHAMADA TERMINE??
};


// REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
};


export default createStore(reducer);
