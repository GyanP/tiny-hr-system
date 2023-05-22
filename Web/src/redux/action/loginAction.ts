import { SET_LOGGED_IN } from "../constants";

const setLoginStateAction = (isLogged: boolean) => (dispatch: any) => {
    dispatch({ type: SET_LOGGED_IN, payload: isLogged });
}

export {setLoginStateAction};