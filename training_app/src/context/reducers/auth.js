import {
  REGISTER_FAILED,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
} from '../../constants/actionTypes';

const auth = (state, {type, payload}) => {
  switch (type) {
    case REGISTER_LOADING:
      return {
        ...state,
        loading: true,
      };

    case REGISTER_SUCCESS:
      console.log('bị succes rùi');
      return {
        ...state,
        loading: false,
        data: payload,
      };

    case REGISTER_FAILED:
      console.log('bị fail rùi');
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default auth;
