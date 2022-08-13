import {
  ROOM_DETAILS_LOADING,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
} from '../../constants/actionNames';

const room = (state, {type, payload}) => {
  switch (type) {
    case ROOM_DETAILS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case ROOM_DETAILS_SUCCESS:
      console.log(state, type, payload);
      return {
        ...state,
        loading: false,
        data: payload,
        isChecking: true,
      };

    case ROOM_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        isChecking: false,
      };

    default:
      return state;
  }
};

export default room;
