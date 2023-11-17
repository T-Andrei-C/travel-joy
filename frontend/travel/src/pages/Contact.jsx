import ContactIcon from "../components/img/ContactIcon.svg"
import FormInput from "../components/FormInput";
import {onSubmit} from "../service/AuthenticateService";
import axios, {AxiosError} from "axios";
import {API_URL} from "../service/API";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSignIn} from "react-auth-kit";

const Contact = () => {

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        setError("");

        console.log(values)

        try {
            const response = await axios.post(
                API_URL + "contactus",
                values
            )

            navigate("/");

        } catch (err) {
            if (err instanceof AxiosError) setError(err.response?.data.message);
            else if (err instanceof Error) setError(err.message);
        }
    }

    const onSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const authenticateData = {
            firstName: formData.get("firstname"),
            lastName: formData.get("lastname"),
            phoneNumber: formData.get("phonenumber"),
            email: formData.get("email"),
            message: formData.get("message")
        };
        onSubmit(authenticateData);
    }

    return (
        <div className="col-12 row p-0 m-0 mt-5">
            <div className="col-lg-6 col-12 d-flex justify-content-center d-lg-flex d-none">
                <img className="my-4" src={ContactIcon} alt="contactIcon"/>
            </div>
            <form onSubmit={onSave} className="d-flex justify-content-center col-lg-6 col-12">
                <div className="card border-success rounded-4">
                    <div className="card-body text-center">
                        <h3 className="mb-5">Get in touch with us</h3>
                        <div className="row">
                            <div className="col-md-6 ">
                                <FormInput content="First name" type="text" name="firstname" />
                            </div>
                            <div className="col-md-6 ">
                                <FormInput content="Last name" type="text" name="lastname" />
                            </div>
                        </div>

                        <FormInput content="Phone Number" type="tel"  name="phonenumber"/>
                        <FormInput content="Email" type="email" name="email" />

                        <p className="text-danger" hidden={error === ""}>Message should have at least 20 characters and a maximum of 600 !</p>

                        <div className="form-floating mb-4">
                            <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                                   htmlFor="floatingInputValue">Message</label>
                            <textarea name="message" className="form-control form-control-lg border-success"
                                      required={true} style={{fontSize: "1.1em", height: "8em"}}/>
                        </div>

                        <button className="btn btn-success btn-lg btn-block" type="submit">SEND</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Contact