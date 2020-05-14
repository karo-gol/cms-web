import { combineReducers } from 'redux'

const accessToken = (state="", action={}) => {
    return state;
};

const rootReducer = combineReducers({
    accessToken
});

export default rootReducer;