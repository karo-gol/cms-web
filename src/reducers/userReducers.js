import { SET_ACCESS_TOKEN, CLEAR_ACCESS_TOKEN } from "../actions/userActions";

const userReducer = (state="", action={}) => {
    switch(action.type) {
        case SET_ACCESS_TOKEN:
            return action.accessToken;
        case CLEAR_ACCESS_TOKEN:
            return "";
    }
    return state;
};

export default userReducer;