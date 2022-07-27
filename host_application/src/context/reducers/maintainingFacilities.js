import {
  GET_MFACILITIES_FAILED,
  GET_MFACILITIES_SUCCESS,
  GET_MFACILITIES_LOADING,
} from '../../constants/actionTypes';

const maintainingFacilities = (state, {type, payload}) => {
  switch (type) {
    case GET_MFACILITIES_LOADING:
    return {
      ...state,
      getMaintainingFacilities: {
        ...state.getMaintainingFacilities,
        loading: true,
        error: null,
      },
    };

    case GET_MFACILITIES_SUCCESS:
    return {
      ...state,
      getMaintainingFacilities: {
        ...state.getMaintainingFacilities,
        loading: false,
        data: payload,
        error: null,
      },
    };

    case GET_MFACILITIES_FAILED:
    return {
      ...state,
      getMaintainingFacilities: {
        ...state.getMaintainingFacilities,
        loading: false,
        error: payload,
      },
    };

    default:
      return state;
  }
};

export default maintainingFacilities;
