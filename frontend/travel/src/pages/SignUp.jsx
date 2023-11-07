import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useSignIn} from "react-auth-kit";
import axios, {AxiosError} from "axios";

const SignUp = () => {

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const signIn = useSignIn();

    const onSubmit = async (values) => {
        console.log("Values: ", values);
        setError("");

        try {
            const response = await axios.post(
                "http://localhost:8080/travel/api/auth/signup",
                values
            )
            console.log(response);
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
                        <div className="col-md-6 mb-4">
                            <div className="form-floating">
                                <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                                       htmlFor="floatingInputValue">First name</label>
                                <input name="firstname" className="form-control form-control-lg border-success" required={true}/>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="form-floating">
                                <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                                       htmlFor="floatingInputValue">Last name</label>
                                <input name="lastname" type="text" className="form-control form-control-lg border-success" required={true}/>
                            </div>
                        </div>
                    </div>

                    <div className="form-floating mb-4">
                        <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                               htmlFor="floatingInputValue">Email</label>
                        <input name="email" type="email" className="form-control form-control-lg border-success" required={true}/>
                    </div>

                    <div className="form-floating mb-4">
                        <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                               htmlFor="floatingInputValue">Password</label>
                        <input name="password" type="password" className="form-control form-control-lg border-success" required={true}/>
                    </div>
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