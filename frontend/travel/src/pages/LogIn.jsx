import axios, {AxiosError} from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSignIn} from "react-auth-kit";

function LogIn() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const signIn = useSignIn();

    const onSubmit = async (values) => {
        console.log("Values: ", values);
        // setError("");

        try {
            const response = await axios.post(
                "http://localhost:8080/travel/api/auth/login",
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
            email: formData.get("email"),
            password: formData.get("password"),
        };
        onSubmit(authenticateData);
    }

    return (
        <form onSubmit={onSave} className="d-flex justify-content-center " style={{marginTop: "5em"}}>
            <div className="col-10 col-md-8 col-lg-6 col-xl-4 card border-success rounded-4">
                <div className="card-body p-lg-5 p-xl-5 p-md-5 text-center">
                    <h3 className="mb-5">Log in</h3>

                    <div className="form-floating  mb-4">
                        <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                               htmlFor="floatingInputValue">Email</label>
                        <input type="email" name="email" className="form-control form-control-lg border-success"
                               required={true}/>
                    </div>

                    <div className="form-floating mb-4">
                        <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                               htmlFor="floatingInputValue">Password</label>
                        <input type="password" name="password" className="form-control form-control-lg border-success" required={true}/>
                    </div>
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