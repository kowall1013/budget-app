import React from "react";
import { Wrapper } from "./Input.css";

function Input({ input, meta, label }) {
  return (
    <Wrapper>
      <label>{label}</label>
      <input {...input} type="text" placeholder={label} />

      {meta.error && meta.touched && <span>{meta.error}</span>}
    </Wrapper>
  );
}

export default Input;
