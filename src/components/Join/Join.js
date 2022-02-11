import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { addRoomInfos } from "../../redux/actions/allActions/random Rooms A/randomChatReducer";
import "./Join.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "./TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/fontawesome-free-solid";

const Join = () => {
  const validate = Yup.object({
    name: Yup.string()
      .max(15, "Name Must be 15 characters or less")
      .min(3, "Name Must be 3 characters or more")
      .required("Name is Required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
    room: Yup.string()
      .max(15, "Room Must be 15 characters or less")
      .min(3, "Room Must be 3 characters or more")
      .required("Room is Required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  });

  const JoinValidate = Yup.object({
    name: Yup.string()
      .max(15, "Name Must be 15 characters or less")
      .min(3, "Name Must be 3 characters or more")
      .required("Name is Required"),
  });

  const [isNameTaken, setIsNameTaken] = useState("");
  const [nameTakenMessage, setNameTakenMessage] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [joinByUrl, setJoinByUrl] = useState(false);
  const ref = useRef(null);
  const join = cookies.get("joinByUrl");

  useEffect(() => {
    const jo = cookies.get("joinByUrl");
    console.log(jo);

    if (jo !== undefined) {
      setJoinByUrl(true);
      cookies.set("room", jo, { path: "/" });
      console.log("haha");
    } else {
      console.log("else");
    }
  }, []);

  const checkUserInRoom = async (name, room) => {
    let thereIs = false;
    setIsNameTaken("");
    await axios
      .get("https://chatrooooom.herokuapp.com/users")
      .then((response) => {
        response.data.map((user) => {
          if (user.name === name && user.room === room) {
            setIsNameTaken("close");
            setNameTakenMessage("name is already taken please change it!");
            thereIs = true;
          }
          return;
        });
        if (!thereIs) {
          setIsNameTaken("open");
        }
      });
    cookies.set("userName", name, { path: "/" });
    if (join !== undefined) {
    } else {
      cookies.set("room", room, { path: "/" });
    }
  };

  useEffect(() => {
    const r = ref.current.values;
    if (isNameTaken === "open") {
      if (join !== undefined) {
        navigate(`/chat/${join}`);
      } else {
        navigate(`/chat/${r.room}`);
      }
    }
  }, [isNameTaken]);

  return (
    <>
      {joinByUrl ? (
        <Formik
          innerRef={ref}
          initialValues={{
            name: "",
          }}
          validationSchema={JoinValidate}
          onSubmit={(values) => {
            checkUserInRoom(values.name, join);
          }}
        >
          {(formik) => (
            <div className="joinContainer">
              <div className="c">
                <div className="signUp">
                  <p>
                    <FontAwesomeIcon
                      icon={faComments}
                      style={{
                        color: "#18ffff",
                        fontSize: "1.5rem",
                        cursor: "pointer",
                      }}
                    />{" "}
                    Join to {join} Room
                  </p>
                </div>
                <Form>
                  {isNameTaken === "close" && (
                    <div className="nameTakenMessage">
                      <p>{nameTakenMessage} </p>
                    </div>
                  )}

                  <TextField name="name" />
                  <div className="joinToOtherRoomsContainer">
                    <p
                      onClick={() => {
                        cookies.remove("joinByUrl", { path: "/" });
                        cookies.remove("userName", { path: "/" });
                        cookies.remove("room", { path: "/" });
                        setJoinByUrl(false);
                      }}
                    >
                      join to other rooms
                    </p>
                  </div>
                  <div className="buttonContainer">
                    <button className="signInButton" type="submit">
                      Join
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          )}
        </Formik>
      ) : (
        <Formik
          innerRef={ref}
          initialValues={{
            name: "",
            room: "",
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            checkUserInRoom(values.name, values.room);
          }}
        >
          {(formik) => (
            <div className="joinContainer">
              <div className="c">
                <div className="signUp">
                  <p>
                    <FontAwesomeIcon
                      icon={faComments}
                      style={{
                        color: "#18ffff",
                        fontSize: "1.5rem",
                        cursor: "pointer",
                      }}
                    />{" "}
                    Welcome To ChatRoom
                  </p>
                </div>
                <Form>
                  {isNameTaken === "close" && (
                    <div className="nameTakenMessage">
                      <p>{nameTakenMessage} </p>
                    </div>
                  )}

                  <TextField name="name" />
                  <TextField name="room" />

                  <div className="buttonContainer">
                    <button className="signInButton" type="submit">
                      Sign In
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          )}
        </Formik>
      )}
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
export default connect(mapStateToProps, mapDispatchToProps)(Join);
