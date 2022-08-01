import {
  GET_ROOMS_BY_ID_BUILDING_FAILED,
  GET_ROOMS_BY_ID_BUILDING_LOADING,
  GET_ROOMS_BY_ID_BUILDING_SUCCESS,
  GET_ROOMS_FAILED,
  GET_ROOMS_LOADING,
  GET_ROOMS_SUCCESS,
} from '../../constants/actionTypes';

const rooms = (state, {type, payload}) => {
  switch (type) {
    case GET_ROOMS_LOADING:
    case GET_ROOMS_BY_ID_BUILDING_LOADING:
      return {
        ...state,
        getRooms: {
          ...state.getRooms,
          loading: true,
          error: null,
        },
      };

    case GET_ROOMS_SUCCESS:
    case GET_ROOMS_BY_ID_BUILDING_SUCCESS:
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
    case GET_ROOMS_BY_ID_BUILDING_FAILED:
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
