import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_USER_SUCCESS,
  LOGOUT_SUCCESS,
} from '../../constants/actionNames';
import {LOGOUT} from '../../constants/routeNames';

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

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        isLoggedIn: false,
      };

    case LOGOUT_SUCCESS:
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
