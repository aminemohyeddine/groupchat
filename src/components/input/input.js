import React from "react";
import "./input.css";
import Picker from "emoji-picker-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/fontawesome-free-solid";

import { faSmile, faPaperPlane } from "@fortawesome/fontawesome-free-solid";

const Input = ({
  message,
  setMessage,
  sendMessage,
  isEmojis,
  setIsEmojis,
  isActiveUsers,
  users,
  setIsActiveUsers,
}) => {
  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };

  return (
    <div className="inputContainer">
      <input
        placeholder="type message"
        className="sendMessageInput"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMessage(event) : null
        }
      />

      <div
        className="paperEmojiContainer"
        onClick={(e) => {
          sendMessage(e);
        }}
      >
        <FontAwesomeIcon icon={faPaperPlane} className="paperEmoji" />
      </div>
      <div
        className="emojisButtonContainer"
        style={{ marginLeft: "10px" }}
        onClick={() => {
          setIsEmojis(!isEmojis);
        }}
      >
        <FontAwesomeIcon icon={faSmile} className="smileEmoji" />
      </div>

      {isEmojis && (
        <div className="emojisContainer">
          <Picker disableSearchBar={true} onEmojiClick={onEmojiClick} />
        </div>
      )}
      <div className="activeUsersContainer">
        <div
          className="activeUsers"
          style={{
            backgroundColor: !isActiveUsers ? "transparent" : "transparent",
          }}
          onClick={() => {
            setIsActiveUsers(!isActiveUsers);
          }}
        >
          <FontAwesomeIcon
            icon={faCircle}
            style={{
              color: "rgb(37, 250, 0)",
            }}
            className="activeButton"
          />
          <p
            style={{ color: !isActiveUsers ? "white" : "#18ffff" }}
            className="activeUsersText"
          >
            Active Users
          </p>
        </div>
      </div>
      {isActiveUsers && (
        <div className="activeUsersList">
          <div className="usersList">
            {users.map((user, key) => {
              return (
                <div key={key} className="usersListUser">
                  <p>
                    <FontAwesomeIcon
                      icon={faCircle}
                      style={{
                        color: "#81c91d",
                        fontSize: "0.6rem",
                        marginRight: "5px",
                      }}
                    />
                  </p>
                  <p
                    onClick={() => {
                      setMessage(message + ` @${user.name} `);
                    }}
                    style={{ cursor: "pointer" }}
                    className="userName"
                  >
                    {user.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Input;
