import { SET_LOGGED_IN } from "../constants";

const initialState = {
  isLoggedIn: false,
};

 const loginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOGGED_IN:
      return { isLoggedIn: action.payload};

    default:
      return state;
  }
};

export {loginReducer};

