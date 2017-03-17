import {SET_CURRENT_USER} from '../actions/types/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function reducer(state= initialState, action = {}) {

    switch (action.type) {
      case "FETCH_USER": {
        return {...state}
      }
      case SET_CURRENT_USER: {
        return {
          isAuthenticated: !isEmpty(action.user),
          user: action.user
        }
      }
      case "FETCH_USER_REJECTED": {
        return {...state, fetching: false, errors: action.payload}
      }
      case "FETCH_USER_STORED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          user: action.user,
        }
      }
      case "FETCH_USER_FULFILLED": {
        return {
          ...state,
          fetching: false,
          fetched: true,
          user: action.payload,
        }
      }
      case "SET_USER_NAME": {
        return {
          ...state,
          user: {...state.user, name: action.payload},
        }
      }
      case "SET_USER_AGE": {
        return {
          ...state,
          user: {...state.user, age: action.payload},
        }
      }
    }

    return state
}
