import {
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_USER_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../../constants/actionNames';
import {LOGOUT} from '../../constants/routeNames';

const auth = (state, {type, payload}) => {
  switch (type) {
    case LOGIN_LOADING:
    case REGISTER_LOADING:
      return {
        ...state,
        loading: true,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
        isLoggedIn: true,
      };

    case REGISTER_FAIL:
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
