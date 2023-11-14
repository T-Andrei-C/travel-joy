import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSignIn} from "react-auth-kit";
import FormInput from "../components/FormInput";
import {onSubmit} from "../service/AuthenticateService";

function LogIn() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const signIn = useSignIn();


    const onSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const authenticateData = {
            email: formData.get("email"),
            password: formData.get("password"),
        };
        onSubmit("auth/login", setError, authenticateData, navigate, signIn);
    }

    return (
        <form onSubmit={onSave} className="d-flex justify-content-center mt-5" style={{marginTop: "5em"}}>
            <div className="col-10 col-md-8 col-lg-6 col-xl-4 card border-success rounded-4">
                <div className="card-body p-lg-5 p-xl-5 p-md-5 text-center">
                    <h3 className="mb-5">Log in</h3>

                    <FormInput content="Email" type="email" name="email" />
                    <FormInput content="Password" type="password" name="password" />

                    <p className="text-danger" hidden={error === ""}>Email or password are invalid !</p>

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