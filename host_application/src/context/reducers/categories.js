import {
  GET_CATEGORIES_FAILED,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_LOADING,
} from '../../constants/actionTypes';

const categories = (state, {type, payload}) => {
  switch (type) {
    case GET_CATEGORIES_LOADING:
      return {
        ...state,
        getCategories: {
          ...state.getCategories,
          loading: true,
          error: null,
        },
      };

    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        getCategories: {
          ...state.getCategories,
          loading: false,
          data: payload,
          error: null,
        },
      };

    case GET_CATEGORIES_FAILED:
      return {
        ...state,
        getCategories: {
          ...state.getCategories,
          loading: false,
          error: payload,
        },
      };

    default:
      return state;
  }
};

export default categories;
