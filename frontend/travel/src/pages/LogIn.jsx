import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useIsAuthenticated, useSignIn} from "react-auth-kit";
import FormInput from "../components/FormInput";
import {onSubmit} from "../service/AuthenticateService";
import InfoPopup from "../components/InfoPopup";
import {sendEmailForForgotPassword} from "../service/CRUDEmail";

function LogIn() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const signIn = useSignIn();
    const isAuth = useIsAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
        if(isAuth()){
            navigate("/");
        }
    },[])

    const onSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const authenticateData = {
            email: formData.get("email"),
            password: formData.get("password"),
        };
        onSubmit("auth/login", setError, authenticateData, navigate, signIn);
    }

    const sendEmailForgotPassword = () => {
        const recipient = {
            recipient: email
        }

        sendEmailForForgotPassword(recipient);
    }

    return (
        <form onSubmit={onSave} className="d-flex justify-content-center mt-5" style={{marginTop: "5em"}}>
            <div className="col-10 col-md-8 col-lg-6 col-xl-4 card border-success rounded-4">
                <div className="card-body p-lg-5 p-xl-5 p-md-5 text-center">
                    <h3 className="mb-5">Log in</h3>

                    <div className="form-floating mb-4">
                        <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                               htmlFor="floatingInputValue">Email</label>
                        <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} className="form-control form-control-lg border-success"
                               required={true} style={{fontSize: "1.1em"}}/>
                    </div>
                    <FormInput content="Password" type="password" name="password" />

                    <p className="text-danger" hidden={error === ""}>
                        Email or password are invalid !
                        <a data-bs-toggle="modal"
                           onClick={sendEmailForgotPassword}
                           data-bs-target="#logIn" href="#" className="text-danger">Forgot password?</a>
                    </p>
                    <InfoPopup id="logIn" header="Password Reset Email Sent" content="We've sent an email to the address associated with your account. Please check your inbox and follow the instructions in the email to reset your password."/>

                    <button className="btn btn-success btn-lg btn-block " type="submit">LogIn</button>

                    <hr/>

                    <p className="mt-5">
                        Not a member yet? <a href="/signup" className="text-success">Sign up</a>
                    </p>
                </div>
            </div>
        </form>
    )
}

export default LogIn;