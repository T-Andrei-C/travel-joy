import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useSignIn} from "react-auth-kit";
import axios, {AxiosError} from "axios";
import {API_URL} from "../service/API";
import FormInput from "../components/FormInput";

const SignUp = () => {

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const signIn = useSignIn();

    const onSubmit = async (values) => {
        setError("");

        try {
            const response = await axios.post(
                API_URL + "auth/signup",
                values
            )

            signIn({
                token: response.data.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: {email: values.email},
            })
            navigate("/");
        } catch (err) {
            if (err instanceof AxiosError) setError(err.response?.data.message);
            else if (err instanceof Error) setError(err.message);
        }
        // Todo: eliminate duplicated code
    }

    const onSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const authenticateData = {
            firstname: formData.get("firstname"),
            lastname: formData.get("lastname"),
            email: formData.get("email"),
            password: formData.get("password"),
        };
        onSubmit(authenticateData);
    }

    return (
        <form onSubmit={onSave} className="d-flex justify-content-center " style={{marginTop: "3em"}}>
            <div className="col-10 col-md-8 col-lg-6 col-xl-4 card border-success rounded-4">
                <div className="card-body p-lg-5 p-xl-5 p-md-5 text-center">
                    <h3 className="mb-5">Sign up</h3>
                    <div className="row">
                        <div className="col-md-6">
                            <FormInput content="First name" type="text" name="firstname" />
                        </div>
                        <div className="col-md-6">
                            <FormInput content="Last name" type="text" name="lastname" />
                        </div>
                    </div>

                    <FormInput content="Email" type="email" name="email" />
                    <FormInput content="Password" type="password" name="password" />

                    <p className="text-danger" hidden={error === ""}>Email is already in use !</p>

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