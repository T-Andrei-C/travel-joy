const FormInput = ({content, type, name, defaultValue, className, disabled, value}) => {
    return(
        <div className="form-floating mb-4">
            <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                   htmlFor="floatingInputValue">{content}</label>
            <input type={type} name={name} className={`form-control form-control-lg border-success ${className}`}
                   required={true} disabled={disabled} defaultValue={defaultValue} style={{fontSize: "1.1em"}}/>
        </div>
    );
}

export default FormInput;