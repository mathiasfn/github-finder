import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import * as types from '../types';

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    alert: null,
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const searchUsers = async (value) => {
    console.log('search users', value);
    setLoading();

    try {
      const response = await axios.get('https://api.github.com/search/users', {
        params: {
          q: value,
          client_id: githubClientId,
          client_secret: githubClientSecret
        }
      });
      console.log('users', response.data.items);
      //setUsers(response.data.items);
      dispatch({
        type: types.SET_USERS,
        payload: response.data.items
      });
    } catch (e) {
      console.log('couldnt fetch users from github');
    }
  };

  const getUser = async (username) => {
    setLoading();

    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`,
        {
          params: {
            client_id: process.env.githubClientId,
            client_secret: process.env.githubClientSecret
          }
        }
      );
      setUser(response.data);
    } catch (e) {
      console.log('couldnt fetch user from github');
    }
  };

  const setUser = (user) => {
    dispatch({
      type: types.SET_USER,
      payload: user
    });
  };

  const clearUsers = () => {
    dispatch({
      type: types.CLEAR_USERS
    });
  };

  const getUserRepos = async (username) => {
    setLoading();

    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos`,
        {
          params: {
            per_page: 5,
            sort: 'created:asc',
            client_id: githubClientId,
            client_secret: githubClientSecret
          }
        }
      );
      setRepos(response.data);
    } catch (e) {
      console.log('couldnt fetch user repos from github');
    }
  };

  const setRepos = (repos) => {
    dispatch({
      type: types.SET_REPOS,
      payload: repos
    });
  };

  const setLoading = (loading) => {
    dispatch({ type: types.SET_LOADING });
  };

  const setAlert = (message, type) => {
    dispatch({
      type: types.SET_ALERT,
      payload: {
        message,
        type
      }
    });

    setTimeout(() => {
      dispatch({
        type: types.REMOVE_ALERT
      });
    }, 2000);
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        alert: state.alert,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
        setAlert
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
