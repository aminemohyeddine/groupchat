import React from "react";
import { ErrorMessage, useField } from "formik";

export const TextField = ({ ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="form">
        <input
          name={props.name}
          type="text"
          id={props.name === "room" ? "room" : "name"}
          className="form__input"
          autoComplete="off"
          placeholder=" "
          {...field}
        />
        <label
          htmlFor={props.name === "room" ? "room" : "name"}
          className="form__label"
        >
          {props.name === "room" ? "Room" : "Name"}
        </label>
      </div>
      <div
        style={{
          height: "30px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          color: "rgb(255, 0, 0)",
          marginBottom: props.name === "name" ? "15px" : "0px",
        }}
        className="errorMessageContainer"
      >
        <ErrorMessage name={field.name} />
      </div>
    </>
  );
};
