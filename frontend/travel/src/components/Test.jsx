import DatePicker, {DateObject} from "react-multi-date-picker";
import "react-multi-date-picker/styles/colors/green.css"
import {useState} from "react";


const Test = () => {
    const [values, setValues] = useState([
        new DateObject().subtract(4, "days"),
        new DateObject().add(4, "days")
    ])

    console.log(values);

    return (
        <DatePicker
            value={values}
            onChange={setValues}
            range
            required={true}
            className="green"
        />
    )
}

export default Test;