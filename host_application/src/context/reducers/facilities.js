import {
  GET_FACILITIES_FAILED,
  GET_FACILITIES_LOADING,
  GET_FACILITIES_SUCCESS,
} from '../../constants/actionTypes';

const facilities = (state, {type, payload}) => {
  console.log('state--------------------', state);
  console.log('type--------------------', type);
  console.log('payload--------------------', payload);

  switch (type) {
    case GET_FACILITIES_LOADING:
      return {
        ...state,
        getFacilities: {
          ...state.getFacilities,
          loading: true,
          error: null,
        },
      };

    case GET_FACILITIES_SUCCESS:
      return {
        ...state,
        getFacilities: {
          ...state.getFacilities,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_FACILITIES_FAILED:
      return {
        ...state,
        getFacilities: {
          ...state.getFacilities,
          loading: false,
          error: payload,
        },
      };

    default:
      return state;
  }
};

export default facilities;
