import {
  GET_BUILDINGS_FAILED,
  GET_BUILDINGS_SUCCESS,
  GET_BUILDINGS_LOADING,
  CREATE_BUILDING_SUCCESS,
  CREATE_BUILDING_LOADING,
  CREATE_BUILDING_FAILED,
  DELETE_BUILDING_LOADING,
  DELETE_BUILDING_SUCCESS,
  DELETE_BUILDING_FAILED,
} from '../../constants/actionTypes';

const buildings = (state, {type, payload}) => {
  switch (type) {
    // Delete
    case DELETE_BUILDING_LOADING:
      return {
        ...state,
        deleteBuilding: {
          ...state.deleteBuilding,
          loading: true,
          error: null,
        },
      };

    case DELETE_BUILDING_SUCCESS:
      return {
        ...state,
        deleteBuilding: {
          ...state.deleteBuilding,
          loading: false,
          error: null,
        },

        getBuildings: {
          ...state.getBuildings,
          loading: false,
          data: state.getBuildings.data.filter(item => {
            return item.id !== payload; // Prevent show deleted items
          }),
          error: null,
        },
      };

    case DELETE_BUILDING_FAILED:
      return {
        ...state,
        deleteBuilding: {
          ...state.deleteBuilding,
          loading: false,
          error: null,
        },
      };

    // Create
    case CREATE_BUILDING_LOADING:
      return {
        ...state,
        createBuilding: {
          ...state.createBuilding,
          loading: true,
          error: null,
        },
      };

    case CREATE_BUILDING_SUCCESS:
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
          data: [...state.getBuildings.data, payload],
          error: null,
        },
      };

    case CREATE_BUILDING_FAILED:
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
