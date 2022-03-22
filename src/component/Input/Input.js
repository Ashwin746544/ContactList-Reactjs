import React from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.Input}>
      <label htmlFor={props.label}>{props.label}</label>
      <input className={!props.valid ? classes.invalidInput : ''} type={props.inpType} name={props.label} id={props.label} placeholder={props.placeHolder} ref={ref} />
      {!props.valid && <small className={classes.ErrorText}>{props.errorMessage}</small>}
    </div>);
})

export default Input;