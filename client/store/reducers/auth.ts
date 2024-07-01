import { USER_STATE_CHANGE } from "../constants";

const initialState = {
  authUser: null,
  loaded: false,
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        authUser: action.authUser,
        loaded: action.loaded,
      };
    default:
      return state;
  }
};
