export const ADD_REVIEW = 'ADD_REVIEW';
export const EDIT_REVIEW = 'EDIT_REVIEW';
export const UPDATE_REVIEW = 'UPDATE_REVIEW';
export const DELETE_REVIEW = 'DELETE_REVIEW';
export const SET_URL = 'SET_URL';

export const addReview = review => ({type: ADD_REVIEW, payload: review});
export const editReview = review => ({type: EDIT_REVIEW, payload: review});
export const updateReview = review => ({type: UPDATE_REVIEW, payload: review});
export const deleteReview = id => ({type: DELETE_REVIEW, payload: id});
export const setUrl = (userId, url) => ({type: SET_URL, payload: {userId, url}});
