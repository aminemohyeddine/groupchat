import React, { useState, useEffect } from "react";
import "./infoBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import {
  faUsers,
  faSignOutAlt,
  faShare,
} from "@fortawesome/fontawesome-free-solid";

const InfoBar = ({
  isActiveUsers,
  setIsActiveUsers,

  users,
  message,
  setMessage,
}) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [showCopied, setShowCopied] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [showOnlyIcons, setShowOnlyIcons] = useState(false);
  let roomName = cookies.get("room");

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    if (width <= 550) {
      setShowOnlyIcons(true);
    } else {
      setShowOnlyIcons(false);
    }
  }, [width]);

  return (
    <div className="infoBar">
      <div className="infoBarContainer">
        <div className="infoBarIconContainer">
          <FontAwesomeIcon className="groupButton" icon={faUsers} />
        </div>
        <div className="infoBarTextContainer">
          <h3 className="roomName">{roomName} room</h3>
        </div>
      </div>
      {/* leave group */}
      <div className="menuContainer">
        <div className="leaveGroupContainer">
          <div
            className="leaveGroup"
            style={{
              backgroundColor: "transparent",
            }}
            onClick={() => {
              navigate(`/`);
            }}
          >
            <FontAwesomeIcon
              icon={faSignOutAlt}
              style={{
                color: "red",
                fontSize: "1.2rem",
              }}
              className="activeButton"
            />
            {!showOnlyIcons && <p>Leave Group</p>}
          </div>
        </div>
        <div className="leaveGroupContainer">
          <div
            className="leaveGroup"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setShowCopied(true);
              setTimeout(() => {
                setShowCopied(false);
              }, 1000);
            }}
            style={{
              border: "3px solid #18ffff",
              backgroundColor: "transparent",
            }}
          >
            <FontAwesomeIcon
              icon={faShare}
              style={{
                color: "#18ffff",
                fontSize: "1.2rem",
              }}
              className="activeButton"
            />
            {!showOnlyIcons && <p>Invite Friends</p>}
          </div>

          {showCopied ? (
            <div className="copiedText">Link Copied</div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
