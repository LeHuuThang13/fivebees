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
  GET_DATA_BUILDINGS_ID_SUCCESS,
  GET_DATA_BUILDINGS_ID_FAILED,
  GET_DATA_BUILDINGS_ID_LOADING,
} from '../../constants/actionTypes';

const buildings = (state, {type, payload}) => {
  switch (type) {
    // Delete
    case DELETE_BUILDING_LOADING:
      return {
        ...state,
        deleteBuilding: {
          ...state.deleteBuilding,
          loading_building: true,
          error: null,
        },
      };

    case DELETE_BUILDING_SUCCESS:
      return {
        ...state,
        deleteBuilding: {
          ...state.deleteBuilding,
          loading_building: false,
          error: null,
        },

        getBuildings: {
          ...state.getBuildings,
          loading_building: false,
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
          loading_building: false,
          error: null,
        },
      };

    // Create
    case CREATE_BUILDING_LOADING:
      console.log('loading rùi nè');
      return {
        ...state,
        createBuilding: {
          ...state.createBuilding,
          loading_building: true,
          error: null,
        },
      };

    case CREATE_BUILDING_SUCCESS:
      return {
        ...state,
        createBuilding: {
          ...state.createBuilding,
          loading_building: false,
          error: null,
          data: payload,
        },

        getBuildings: {
          ...state.getBuildings,
          loading_building: false,
          data: [...state.getBuildings.data, payload],
          error: null,
        },
      };

    case CREATE_BUILDING_FAILED:
      return {
        ...state,
        createBuilding: {
          ...state.createBuilding,
          loading_building: false,
          error: payload,
        },
      };
    case GET_DATA_BUILDINGS_ID_LOADING:
      return {
        ...state,
        getBuildingData: {
          ...state.getBuildingData,
          loading_building: true,
          error: null,
        },
      };

    case GET_DATA_BUILDINGS_ID_SUCCESS:
      return {
        ...state,
        getBuildingData: {
          ...state.getBuildingData,
          loading_building: false,
          data: payload,
          error: null,
        },
      };

    case GET_DATA_BUILDINGS_ID_FAILED:
      return {
        ...state,
        getBuildingData: {
          ...state.getBuildingData,
          loading_building: false,
          error: payload,
        },
      };

    case GET_BUILDINGS_LOADING:
      return {
        ...state,
        getBuildings: {
          ...state.getBuildings,
          loading_building: true,
          error: null,
        },
      };

    case GET_BUILDINGS_SUCCESS:
      return {
        ...state,
        getBuildings: {
          ...state.getBuildings,
          loading_building: false,
          data: payload,
          error: null,
        },
      };

    case GET_BUILDINGS_FAILED:
      return {
        ...state,
        getBuildings: {
          ...state.getBuildings,
          loading_building: false,
          error: payload,
        },
      };

    default:
      return state;
  }
};

export default buildings;
