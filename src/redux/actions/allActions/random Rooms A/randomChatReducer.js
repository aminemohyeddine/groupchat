export const addRoomInfos = (name, room) => {
  return {
    type: "addUserToRoom",
    payload: { name, room },
  };
};
