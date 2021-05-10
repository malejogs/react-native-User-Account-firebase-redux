import * as types from "./types";

const initialState = {
  data: {},
  loading: false,
  error: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.USER_LOG_IN_LOADING:
      return { ...state, error: "", loading: true };
    case types.USER_LOG_IN_COMPLETED:
      return { data: payload, error: "", loading: false };
    case types.USER_LOG_IN_ERROR:
      return { data: null, error: payload, loading: false };

    case types.USER_LOG_OUT_LOADING:
      return { ...state, error: "", loading: true };
    case types.USER_LOG_OUT_COMPLETED:
      return { data: null, error: "", loading: false };
    case types.USER_LOG_OUT_ERROR:
      return { data: null, error: payload, loading: false };

    case types.USER_REGISTER_LOADING:
      return { ...state, error: "", loading: true };
    case types.USER_REGISTER_COMPLETED:
      return { data: payload, error: "", loading: false };
    case types.USER_REGISTER_ERROR:
      return { data: null, error: payload, loading: false };

    case types.USER_EDIT_LOADING:
      return { ...state, error: "", loading: true };
    case types.USER_EDIT_COMPLETED:
      return { data: payload, error: "", loading: false };
    case types.USER_EDIT_ERROR:
      return { data: null, error: payload, loading: false };

    case types.USER_DELETE_LOADING:
      return { ...state, error: "", loading: true };
    case types.USER_DELETE_COMPLETED:
      return { data: null, error: "", loading: false };
    case types.USER_DELETE_ERROR:
      return { data: null, error: payload, loading: false };

    case types.USER_CHANGE_PHOTO_LOADING:
      return { ...state, error: "", loading: true };
    case types.USER_CHANGE_PHOTO_COMPLETED:
      return {
        data: payload,
        error: "",
        loading: false,
      };
    case types.USER_CHANGE_PHOTO_ERROR:
      return { data: null, error: payload, loading: false };

    default:
      return state;
  }
};
