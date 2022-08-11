import {
  ROOM_DETAILS_LOADING,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
} from '../../constants/actionNames';

const auth = (state, {type, payload}) => {
  switch (type) {
    case ROOM_DETAILS_LOADING:
      return {
        ...state,
        loading: true,
      };

    case ROOM_DETAILS_SUCCESS:
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

export default auth;
