import {
  GET_FACILITIES_LOADING,
  GET_FACILITIES_SUCCESS,
  GET_FACILITIES_FAIL,
} from '../../constants/actionNames';

const facility = (state, {type, payload}) => {
  switch (type) {
    case GET_FACILITIES_LOADING:
      return {
        ...state,
        loading: true,
      };

    case GET_FACILITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      };

    case GET_FACILITIES_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default facility;
