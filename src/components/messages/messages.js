import React from "react";
import Message from "../message/Message";
import "./messages.css";
import ScrollToBottom from "react-scroll-to-bottom";

const Messages = ({ messages, name }) => {
  return (
    <ScrollToBottom style={{height:"100vh"}} className="messages">
      {messages !== []
        ? messages.map((message, key) => {
            return (
              <div key={key}>
                <Message message={message} name={name} />
              </div>
            );
          })
        : null}
    </ScrollToBottom>
  );
};

export default Messages;
