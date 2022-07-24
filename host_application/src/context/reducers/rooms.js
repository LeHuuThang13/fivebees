import {
  GET_ROOMS_FAILED,
  GET_ROOMS_LOADING,
  GET_ROOMS_SUCCESS,
  LOGIN_FAILED,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_USER,
} from '../../constants/actionTypes';

const rooms = (state, {type, payload}) => {
  switch (type) {
    case GET_ROOMS_LOADING:
      return {
        ...state,
        getRooms: {
          ...state.getRooms,
          loading: true,
          error: null,
        },
      };

    case GET_ROOMS_SUCCESS:
      return {
        ...state,
        getRooms: {
          ...state.getRooms,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_ROOMS_FAILED:
      return {
        ...state,
        getRooms: {
          ...state.getRooms,
          loading: false,
          error: payload,
        },
      };

    default:
      return state;
  }
};

export default rooms;
