import {
  GET_BUILDINGS_FAILED,
  GET_BUILDINGS_SUCCESS,
  GET_BUILDINGS_LOADING,
  CREATE_BUILDINGS_SUCCESS,
  CREATE_BUILDINGS_LOADING,
  CREATE_BUILDINGS_FAILED,
} from '../../constants/actionTypes';

const buildings = (state, {type, payload}) => {
  switch (type) {
    case CREATE_BUILDINGS_LOADING:
      return {
        ...state,
        createBuilding: {
          ...state.createBuilding,
          loading: true,
          error: null,
        },
      };

    case CREATE_BUILDINGS_SUCCESS:
      return {
        ...state,
        createBuilding: {
          ...state.createBuilding,
          loading: false,
          error: null,
          data: payload,
        },

        getBuildings: {
          ...state.getBuildings,
          loading: false,
          data: [payload, ...state.getBuildings.data],
          error: null,
        },
      };

    case CREATE_BUILDINGS_FAILED:
      return {
        ...state,
        createBuilding: {
          ...state.createBuilding,
          loading: false,
          error: payload,
        },
      };

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
