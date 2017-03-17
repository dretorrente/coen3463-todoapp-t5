import { combineReducers } from "redux"

// import flash from "./flashReducer"
import user from "./userReducer"
import todo from "./todoReducer"
// import flashMessage from "./flashReducer";
import token from "./tokenReducer";
export default combineReducers({

    user,
    todo,
    token

})
