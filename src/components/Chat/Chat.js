import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import InfoBar from "../infoBar/infoBar";
import Messages from "../messages/messages";
import Input from "../input/input";
import "./Chat.scss";
import { connect } from "react-redux";
import { addRoomInfos } from "../../redux/actions/allActions/random Rooms A/randomChatReducer";
import Cookies from "universal-cookie";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

let socket;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [nameIsTaken, setNameIsTaken] = useState(false);
  const [isEmojis, setIsEmojis] = useState(false);
  const [isActiveUsers, setIsActiveUsers] = useState(false);
  let { roomFromUrl } = useParams();
  const navigate = useNavigate();
  const cookies = new Cookies();
  var isOnIOS =
    navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i);
  var eventName = isOnIOS ? "pagehide" : "beforeunload";

  useEffect(() => {
    const cookies = new Cookies();
    let userName = cookies.get("userName");
    let roomName = cookies.get("room");
    setName(userName);
    setRoom(roomName);
  }, []);

  useEffect(() => {
    const cookies = new Cookies();
    let userName = cookies.get("userName");
    let roomName = cookies.get("room");
    socket = io(process.env.REACT_APP_BASE_URL, {
      transports: ["websocket", "polling", "flashsocket"],
    });

    if (
      userName === undefined ||
      roomName === undefined ||
      !roomName ||
      !userName
    ) {
      cookies.set("joinByUrl", roomFromUrl, { path: "/" });
      cookies.set("room", roomFromUrl, { path: "/" });

      navigate("/");
    } else {
      cookies.remove("joinByUrl", { path: "/" });
      setRoom(roomFromUrl);

      socket.emit("join", { name: userName, room: roomName }, (error) => {
        if (error) {
          setNameIsTaken(true);
          cookies.set("joinByUrl", roomName, { path: "/" });
          cookies.set("room", roomName, { path: "/" });
        }
      });
      socket.on("message", (message) => {
        setMessages((messages) => [...messages, message]);
      });
      socket.on("roomData", ({ users }) => {
        setUsers(users);
      });

      socket.on("getUpdatedUsers", (usersS) => {
        setUsers(usersS.users);
        setUsers(usersS.users);
      });
    }

    return () => {
      cookies.remove("room", { path: "/" });
      cookies.remove("userName", { path: "/" });
      socket.emit("userDisconnect");
      socket.off();
    };
  }, [navigate, roomFromUrl]);

  window.addEventListener(eventName, () => {
    cookies.remove("room", { path: "/" });
    cookies.remove("userName", { path: "/" });
    socket.emit("userDisconnect");
    socket.on("getUpdatedUsers", (usersS) => {
      setUsers(usersS.users);
    });
    socket.off();
  });

  // function for sending messages
  const sendMessage = (event) => {
    if (message) {
      event.preventDefault();
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  useEffect(() => {
    if (nameIsTaken) {
      navigate("/");
    }
  }, [nameIsTaken]);

  return (
    <>
      <div className="outerContainer">
        <div className="container">
          <div
            onClick={() => {
              setIsEmojis(false);
            }}
            className="emojis"
          >
            <InfoBar
              isActiveUsers={isActiveUsers}
              setIsActiveUsers={setIsActiveUsers}
              users={users}
              roomName={room}
              message={message}
              setMessage={setMessage}
            />
            <Messages messages={messages} name={name} />
          </div>
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            isEmojis={isEmojis}
            setIsEmojis={setIsEmojis}
            isActiveUsers={isActiveUsers}
            setIsActiveUsers={setIsActiveUsers}
            users={users}
          />
        </div>
      </div>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
