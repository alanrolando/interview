import React from "react";
import styles from "./Input.module.css";

const Input = ({
  value,
  label,
  placeholder,
  inputType,
  maxLength,
  name,
  onChange,
  isDisabled,
}) => {
  return (
    <div className={styles.inputContainer}>
      <p className={styles.inputLabel}>{label}</p>
      <input
        className={styles.input}
        value={value}
        disabled={!isDisabled}
        type={inputType}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default Input;
