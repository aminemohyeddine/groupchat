const initialState = {
  userName: "",
  roomName: "",
};
export const roomChatReducer = function (state = initialState, action) {
  switch (action.type) {
    case "addUserToRoom":
      return {
        ...state,
        userName: action.payload.name,
        roomName: action.payload.room,
      };
    default:
      return state;
  }
};
