import {
  CREATE_ROOM_BY_ID_BUILDING_FAILED,
  CREATE_ROOM_BY_ID_BUILDING_LOADING,
  CREATE_ROOM_BY_ID_BUILDING_SUCCESS,
  DELETE_ROOM_BY_ID_FAILED,
  DELETE_ROOM_BY_ID_LOADING,
  DELETE_ROOM_BY_ID_SUCCESS,
  GET_DETAILS_ROOMS_LOADING,
  GET_DETAILS_ROOMS_FAILED,
  GET_DETAILS_ROOMS_SUCCESS,
  GET_ROOMS_BY_ID_BUILDING_FAILED,
  GET_ROOMS_BY_ID_BUILDING_LOADING,
  GET_ROOMS_BY_ID_BUILDING_SUCCESS,
  GET_ROOMS_FAILED,
  GET_ROOMS_LOADING,
  GET_ROOMS_SUCCESS,
  GET_SINGLE_ROOM_FAILED,
  GET_SINGLE_ROOM_SUCCESS,
  GET_SINGLE_ROOM_LOADING,
} from '../../constants/actionTypes';

const rooms = (state, {type, payload}) => {
  switch (type) {
    // Delete
    case DELETE_ROOM_BY_ID_LOADING:
      return {
        ...state,
        deleteRoom: {
          ...state.deleteRoom,
          loading: true,
          error: null,
        },
      };

    case DELETE_ROOM_BY_ID_SUCCESS:
      return {
        ...state,
        deleteRoom: {
          ...state.deleteRoom,
          loading: false,
          error: null,
        },

        getRooms: {
          ...state.getRooms,
          loading: false,
          data: state.getRooms.data.filter(item => {
            return item.id !== payload; // Prevent show deleted items
          }),
          error: null,
        },
      };

    case DELETE_ROOM_BY_ID_FAILED:
      return {
        ...state,
        deleteRoom: {
          ...state.deleteRoom,
          loading: false,
          error: null,
        },
      };

    // Create
    case CREATE_ROOM_BY_ID_BUILDING_LOADING:
      return {
        ...state,
        createRoom: {
          ...state.createRoom,
          loading: true,
          error: null,
        },
      };

    case CREATE_ROOM_BY_ID_BUILDING_SUCCESS:
      return {
        ...state,
        createRoom: {
          ...state.createRoom,
          loading: false,
          error: null,
          data: payload,
        },

        getRooms: {
          ...state.getRooms,
          loading: false,
          data: [...state.getRooms.data, payload],
          error: null,
        },
      };

    case CREATE_ROOM_BY_ID_BUILDING_FAILED:
      return {
        ...state,
        createRoom: {
          ...state.createRoom,
          loading: false,
          error: payload,
        },
      };

    // Get
    case GET_DETAILS_ROOMS_LOADING:
    case GET_ROOMS_LOADING:
    case GET_ROOMS_BY_ID_BUILDING_LOADING:
      return {
        ...state,
        getRooms: {
          ...state.getRooms.data,
          loading: true,
          error: null,
        },
      };

    case GET_DETAILS_ROOMS_SUCCESS:
    case GET_ROOMS_SUCCESS:
    case GET_ROOMS_BY_ID_BUILDING_SUCCESS:
      return {
        ...state,
        getRooms: {
          ...state.getRooms,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_DETAILS_ROOMS_FAILED:
    case GET_ROOMS_FAILED:
    case GET_ROOMS_BY_ID_BUILDING_FAILED:
      return {
        ...state,
        getRooms: {
          ...state.getRooms,
          loading: false,
          error: payload,
        },
      };

    case GET_SINGLE_ROOM_LOADING:
      return {
        ...state,
        getRoom: {
          ...state.getRoom.data,
          loading: true,
          error: null,
        },
      };

    case GET_SINGLE_ROOM_SUCCESS:
      return {
        ...state,
        getRoom: {
          ...state.getRoom,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_SINGLE_ROOM_FAILED:
      return {
        ...state,
        getRoom: {
          ...state.getRoom,
          loading: false,
          error: payload,
        },
      };

    default:
      return state;
  }
};

export default rooms;
