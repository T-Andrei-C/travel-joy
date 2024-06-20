import {useState} from "react";

const CheckboxInput = ({onChange, id, value, className}) => {

    const [switchValue, setSwitchValue] = useState(value);

    const handleChange = async () => {
        if (await onChange(id)) {
            setSwitchValue(!switchValue);
        }
    }

    return (
        <div className={`form-check form-switch ${className}`} key={id}>
            <input className="form-check-input" id="checkBoxInput" checked={!switchValue} type="checkbox" role="switch"
                   onChange={handleChange}/>
        </div>
    )
}

export default CheckboxInput;