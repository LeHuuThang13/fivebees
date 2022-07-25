import {
  GET_FACILITIES_FAILED,
  GET_FACILITIES_LOADING,
  GET_FACILITIES_SUCCESS,
} from '../../constants/actionTypes';

const rooms = (state, {type, payload}) => {
  switch (type) {
    case GET_FACILITIES_LOADING:
      return {
        ...state,
        getRooms: {
          ...state.getRooms,
          loading: true,
          error: null,
        },
      };

    case GET_FACILITIES_SUCCESS:
      return {
        ...state,
        getRooms: {
          ...state.getRooms,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_FACILITIES_FAILED:
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
