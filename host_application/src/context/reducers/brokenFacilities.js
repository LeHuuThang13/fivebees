import {
  GET_BFACILITIES_FAILED,
  GET_BFACILITIES_SUCCESS,
  GET_BFACILITIES_LOADING,
} from '../../constants/actionTypes';

const brokenFacilities = (state, {type, payload}) => {
  switch (type) {
    case GET_BFACILITIES_LOADING:
    return {
      ...state,
      getBrokenFacilities: {
        ...state.getBrokenFacilities,
        loading: true,
        error: null,
      },
    };
    case GET_BFACILITIES_SUCCESS:
    return {
      ...state,
      getBrokenFacilities: {
        ...state.getBrokenFacilities,
        loading: false,
        data: payload,
        error: null,
      },
    };

    case GET_BFACILITIES_FAILED:
    return {
      ...state,
      getBrokenFacilities: {
        ...state.getBrokenFacilities,
        loading: false,
        error: payload,
      },
    };

    default:
      return state;
  }
};

export default brokenFacilities;
