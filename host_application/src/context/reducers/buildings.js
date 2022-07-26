import {
  GET_BUILDINGS_FAILED,
  GET_BUILDINGS_SUCCESS,
  GET_BUILDINGS_LOADING,
} from '../../constants/actionTypes';

const buildings = (state, {type, payload}) => {
  switch (type) {
    case GET_BUILDINGS_LOADING:
    return {
      ...state,
      getBuildings: {
        ...state.getBuildings,
        loading: true,
        error: null,
      },
    };

    case GET_BUILDINGS_SUCCESS:
    return {
      ...state,
      getBuildings: {
        ...state.getBuildings,
        loading: false,
        data: payload,
        error: null,
      },
    };

    case GET_BUILDINGS_FAILED:
    return {
      ...state,
      getBuildings: {
        ...state.getBuildings,
        loading: false,
        error: payload,
      },
    };

    default:
      return state;
  }
};

export default buildings;
