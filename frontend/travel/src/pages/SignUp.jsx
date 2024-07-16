import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useIsAuthenticated, useSignIn} from "react-auth-kit";
import FormInput from "../components/FormInput";
import {onSubmit} from "../service/AuthenticateService";

const SignUp = () => {

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const signIn = useSignIn();
    const isAuth = useIsAuthenticated();

    useEffect(() => {
        if(isAuth()){
            navigate("/");
        }
    },[])

    const onSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const authenticateData = {
            firstname: formData.get("firstname"),
            lastname: formData.get("lastname"),
            email: formData.get("email"),
            password: formData.get("password"),
        };
        onSubmit("auth/signup", setError, authenticateData, navigate, signIn);
    }

    return (
        <form onSubmit={onSave} className="d-flex justify-content-center " style={{marginTop: "3em"}}>
            <div className="col-10 col-md-8 col-lg-6 col-xl-4 card border-success rounded-4">
                <div className="card-body p-lg-5 p-xl-5 p-md-5 text-center">
                    <h3 className="mb-5">Sign up</h3>
                    <div className="row">
                        <div className="col-md-6">
                            <FormInput content="First name" type="text" name="firstname"/>
                        </div>
                        <div className="col-md-6">
                            <FormInput content="Last name" type="text" name="lastname"/>
                        </div>
                    </div>

                    <FormInput content="Email" type="email" name="email"/>
                    <FormInput content="Password" type="password" name="password"/>

                    <p className="text-danger" hidden={error === ""}>{error}</p>

                    <button className="btn btn-success btn-lg btn-block" type="submit">SignUp</button>

                    <hr/>

                    <p className="mt-5">
                        Have an account? <a href="/login" className="text-success">Log in</a>
                    </p>
                </div>
            </div>
        </form>
    );
}

export default SignUp