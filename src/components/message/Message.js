import React from "react";
import ReactEmoji from "react-emoji";
import "./Message.css";

const Message = ({ message: { text, user, time }, name }) => {
  let currentUser = "";
  let trimmedName = name.trim().toLowerCase();
  if (user === trimmedName) {
    currentUser = "user";
  } else if (user === "admin") {
    currentUser = "admin";
  } else {
    currentUser = "others";
  }
  return (
    <>
      {currentUser === "user" && (
        <div className="messageContainer justifyEnd">
          <p
            style={{ cursor: "pointer", color: "white" }}
            className="sentText pr-10"
          >
            {trimmedName}
          </p>
          <div className="messageBox backgroundBlue">
            <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
          </div>
          <p
            style={{ cursor: "pointer", color: "white" }}
            className="sentText pr-10"
          >
            {time}
          </p>
        </div>
      )}
      {currentUser === "others" && (
        <div className="messageContainer justifyStart">
          <p
            style={{ cursor: "pointer", color: "white" }}
            className="sentText pr-10"
          >
            {time}
          </p>
          <div className="messageBox backgroundLight">
            <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
          </div>
          <p
            style={{ cursor: "pointer", color: "white" }}
            className="sentText pl-10 "
          >
            {user}
          </p>
        </div>
      )}
      {currentUser === "admin" && (
        <div className="messageContainer justifyStart">
          <p
            style={{ cursor: "pointer", color: "white" }}
            className="sentText pr-10"
          >
            {time}
          </p>
          <div
            style={{ backgroundColor: "#ffee00" }}
            className="messageBox backgroundLight"
          >
            <p style={{ color: "black" }} className="messageText colorDark">
              {ReactEmoji.emojify(text)}
            </p>
          </div>
          <p
            style={{ cursor: "pointer", color: "white" }}
            className="sentText pl-10 "
          >
            {user}
          </p>
        </div>
      )}
    </>
  );
};

export default Message;
