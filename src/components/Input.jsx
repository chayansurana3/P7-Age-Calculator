import React from "react";

function Input(props) {
    let inputClass = props.isValid ? "input" : "error-input";
    let labelClass = props.isValid ? "label" : "error-label";
    return (
        <div className="inputGroup">
            <label htmlFor={props.labelFor} className={labelClass}>{props.labelFor.toUpperCase()}</label>
            <br />
            <input
                type="text"
                id={props.inputId}
                name={props.inputName}
                maxLength={props.maxLength} 
                placeholder={props.inputPlaceholder}
                onChange={props.handleChange} 
                className={inputClass}
            />
            <br />
            {props.isValid ? null : <span className="errorMessage">{props.invalidMessage}</span>}        
        </div>
    );
}

export default Input;