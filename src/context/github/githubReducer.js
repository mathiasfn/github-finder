import * as types from '../types';

export default (state, action) => {
  switch (action.type) {
    case types.SET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case types.SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case types.CLEAR_USERS:
      return {
        ...state,
        users: []
      };
    case types.SET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false
      };
    case types.SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case types.SET_ALERT:
      return {
        ...state,
        alert: {
          type: action.payload.type,
          message: action.payload.message
        }
      };
    case types.REMOVE_ALERT:
      return {
        ...state,
        alert: null
      };
    default:
      return state;
  }
};
