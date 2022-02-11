import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";
import { connect } from "react-redux";
import { addRoomInfos } from "./redux/actions/allActions/random Rooms A/randomChatReducer";

const App = () => {
  const [joinByUrl, setJoinByUrl] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Join />} />
        <Route
          path="/chat/:roomFromUrl"
          joinByUrl={joinByUrl}
          setJoinByUrl={setJoinByUrl}
          element={<Chat />}
        />
      </Routes>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateRoom: (name, room) => dispatch(addRoomInfos(name, room)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
