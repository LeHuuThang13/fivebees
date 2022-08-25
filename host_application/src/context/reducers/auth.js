import {
  LOGIN_FAILED,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
} from '../../constants/actionTypes';

const auth = (state, {type, payload}) => {
  switch (type) {
    case LOGIN_LOADING:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
        isLoggedIn: true,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case LOGOUT_USER:
      return {
        ...state,
        loading: false,
        data: null,
        isLoggedIn: false,
      };

    case LOGIN_USER_SUCCESS:
      return {
        isLoggedIn: true,
      };

    default:
      return state;
  }
};

export default auth;
