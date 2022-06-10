import React from "react";
import styles from "./styles/stylesInputs.module.css";

export const InputPrymary = (props) => {
  const { onChange, type, password, name, placeholder } = props;

  return (
    <div className={styles.Field}>
      <input
        type={type}
        value={password}
        name={name}
        className={styles.Input}
        placeholder={placeholder}
        required
        onChange={onChange}
      />
    </div>
  );
};

export const InputSecond = (props) => {
  const { onClick, value, type } = props;

  return (
    <div>
      <input
        className={styles.Submit}
        type={type}
        value={value}
        onClick={onClick}
      />
    </div>
  );
};

export const InputPrimaryFormUsers = (props) => {
  const { value, type, name, placeholder, onChange, padding } = props;

  const inputStylesLinea = {
    padding: padding,
  };

  return (
    <div className={styles.FieldAlternative}>
      <input
        type={type}
        value={value}
        name={name}
        className={styles.InputAlternative}
        placeholder={placeholder}
        onChange={onChange}
        padding={padding}
        style={inputStylesLinea}
      />
    </div>
  );
};
