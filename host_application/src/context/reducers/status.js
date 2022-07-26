import {
  GET_STATUS_FAILED,
  GET_STATUS_SUCCESS,
  GET_STATUS_LOADING,
} from '../../constants/actionTypes';

const status = (state, {type, payload}) => {
  switch (type) {
    case GET_STATUS_LOADING:
    return {
      ...state,
      getStatus: {
        ...state.getStatus,
        loading: true,
        error: null,
      },
    };
    case GET_STATUS_SUCCESS:
    return {
      ...state,
      getStatus: {
        ...state.getStatus,
        loading: false,
        data: payload,
        error: null,
      },
    };

    case GET_STATUS_FAILED:
    return {
      ...state,
      getStatus: {
        ...state.getStatus,
        loading: false,
        error: payload,
      },
    };

    default:
      return state;
  }
};

export default status;
