import React from "react";
import Aux from "react-aux";
import uuid from "uuid/v4";
import "./FileInput.css";

const FileInput = ({ children, onChange, className, ...inputProps }) => {
  const rand = uuid();
  return (
    <Aux>
      <input
        type="file"
        name="file"
        id={"file-" + rand}
        onChange={onChange}
        className={`inputfile ${className ? className : ""}`}
        {...inputProps}
      />
      <label
        className={`button ${className ? className : ""}`}
        htmlFor={"file-" + rand}
      >
        {children}
      </label>
    </Aux>
  );
};

export default FileInput;
