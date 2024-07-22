import React, { useState } from "react";

export default function InputBox({
  name,
  type,
  id,
  value,
  placeholder,
  icon,
  disable
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handlePasswordVisible = () => {
    setPasswordVisible((currentVal) => !currentVal);
  };
  return (
    <div className="relative w-[100%] mb-4">
      <input
        className="input-box"
        type={
          type === "password" ? (passwordVisible ? "text" : "password") : type
        }
        name={name}
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        disabled={disable}
      />
      <i className={"fi " + icon + " input-icon"}></i>

      {type === "password" ? (
        <i
          className={
            "fi fi-rr-eye" +
            (!passwordVisible ? "-crossed" : "") +
            " input-icon left-auto right-4 cursor-pointer"
          }
          onClick={handlePasswordVisible}
        ></i>
      ) : (
        ""
      )}
    </div>
  );
}
