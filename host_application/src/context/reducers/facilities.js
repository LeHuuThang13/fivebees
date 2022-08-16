import {
  CREATE_FACILITY_FAILED,
  CREATE_FACILITY_LOADING,
  CREATE_FACILITY_SUCCESS,
  DELETE_FACILITY_FAILED,
  DELETE_FACILITY_LOADING,
  DELETE_FACILITY_SUCCESS,
  EDIT_FACILITY_FAILED,
  EDIT_FACILITY_LOADING,
  EDIT_FACILITY_SUCCESS,
  GET_FACILITIES_FAILED,
  GET_FACILITIES_LOADING,
  GET_FACILITIES_SUCCESS,
} from '../../constants/actionTypes';

const facilities = (state, {type, payload}) => {
  switch (type) {
    //edit
    case EDIT_FACILITY_LOADING:
      return {
        ...state,
        editFacility: {
          ...state.editFacility,
          loading: true,
          error: null,
        },
      };

    case EDIT_FACILITY_SUCCESS:
      return {
        ...state,
        editFacility: {
          ...state.editFacility,
          loading: false,
          error: null,
          data: payload,
        },

        getFacilities: {
          ...state.getFacilities,
          loading: false,
          data: state.getFacilities.data.map(item => {
            if (item.id === payload.id) {
              return payload;
            } else {
              return item;
            }
          }),
          error: null,
        },
      };

    case EDIT_FACILITY_FAILED:
      return {
        ...state,
        createFacility: {
          ...state.getFacilities,
          loading: false,
          error: payload,
        },
      };

    // Create
    case CREATE_FACILITY_LOADING:
      return {
        ...state,
        createFacility: {
          ...state.createFacility,
          loading: true,
          error: null,
        },
      };

    case CREATE_FACILITY_SUCCESS:
      return {
        ...state,
        createFacility: {
          ...state.createFacility,
          loading: false,
          error: null,
          data: payload,
        },

        getFacilities: {
          ...state.getFacilities,
          loading: false,
          data: [...state.getFacilities.data, payload],
          error: null,
        },
      };

    case CREATE_FACILITY_FAILED:
      return {
        ...state,
        createFacility: {
          ...state.createFacility,
          loading: false,
          error: payload,
        },
      };

    // Delete
    case DELETE_FACILITY_LOADING:
      return {
        ...state,
        deleteFacility: {
          ...state.deleteFacility,
          loading: true,
          error: null,
        },
      };

    case DELETE_FACILITY_SUCCESS:
      return {
        ...state,
        deleteFacility: {
          ...state.deleteFacility,
          loading: false,
          error: null,
        },

        getFacilities: {
          ...state.getFacilities,
          loading: false,
          data: state.getFacilities.data.filter(item => {
            return item.id !== payload; // Prevent show deleted items
          }),

          error: null,
        },
      };

    case DELETE_FACILITY_FAILED:
      return {
        ...state,
        deleteFacility: {
          ...state.deleteFacility,
          loading: false,
          error: null,
        },
      };

    //Get
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
          ...state.getFacilities.facilities,
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
