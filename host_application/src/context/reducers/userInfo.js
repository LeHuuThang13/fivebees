import {
  GET_USER_INFO_FAILED,
  GET_USER_INFO_LOADING,
  GET_USER_INFO_SUCCESS,
} from '../../constants/actionTypes';

const rooms = (state, {type, payload}) => {
  switch (type) {
    case GET_USER_INFO_LOADING:
      return {
        ...state,
        getCurUserInfo: {
          ...state.getCurUserInfo,
          loading: true,
          error: null,
        },
      };

    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        getCurUserInfo: {
          ...state.getCurUserInfo,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_USER_INFO_FAILED:
      return {
        ...state,
        getCurUserInfo: {
          ...state.getCurUserInfo,
          loading: false,
          error: payload,
        },
      };

    default:
      return state;
  }
};

export default rooms;
