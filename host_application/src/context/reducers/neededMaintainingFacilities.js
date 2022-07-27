import {
  GET_NMFACILITIES_FAILED,
  GET_NMFACILITIES_SUCCESS,
  GET_NMFACILITIES_LOADING,
} from '../../constants/actionTypes';

const neededMaintainingFacilities = (state, {type, payload}) => {
  switch (type) {
    case GET_NMFACILITIES_LOADING:
    return {
      ...state,
      getNeedMaintainingFacilities: {
        ...state.getNeedMaintainingFacilities,
        loading: true,
        error: null,
      },
    };

    case GET_NMFACILITIES_SUCCESS:
    return {
      ...state,
      getNeedMaintainingFacilities: {
        ...state.getNeedMaintainingFacilities,
        loading: false,
        data: payload,
        error: null,
      },
    };

    case GET_NMFACILITIES_FAILED:
    return {
      ...state,
      getNeedMaintainingFacilities: {
        ...state.getNeedMaintainingFacilities,
        loading: false,
        error: payload,
      },
    };

    default:
      return state;
  }
};

export default neededMaintainingFacilities;
