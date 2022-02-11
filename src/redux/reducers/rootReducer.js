import { combineReducers } from "redux";
import { roomChatReducer } from "./allReducers/random Room R/randomChatReducer";

const rootReducer = combineReducers({
  roomData: roomChatReducer,
});
export default rootReducer;
