import FormInput from "../components/FormInput";
import {useState} from "react";
import {forgotPassword} from "../service/CRUDUsers";
import {useNavigate} from "react-router-dom";

const ForgotPassword = () => {

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (forgotPasswordData) => {
        setError("");
        try {
            const response = await forgotPassword(forgotPasswordData, setError);
            console.log(response.message);
            if (response.message === "Password are not the same") {
                setError(response.message);
            } else {
                navigate("/login");
            }
        } catch (er) {
            console.log("catch");
            console.log(er);
        }
    }

    const onSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const forgotPasswordData = {
            email: formData.get("email"),
            newPassword: formData.get("newPassword"),
            confirmNewPassword: formData.get("confirmNewPassword"),
        };
        onSubmit(forgotPasswordData);
    }

    return (
        <form onSubmit={onSave} className="d-flex justify-content-center" style={{marginTop: "6em"}}>
            <div className="col-10 col-md-8 col-lg-6 col-xl-4 card border-success rounded-4">
                <div className="card-body p-lg-5 p-xl-5 p-md-5 text-center">
                    <h3 className="mb-5">Update Password</h3>

                    <FormInput content="Confirm email" type="email" name="email"/>
                    <FormInput content="New password" type="password" name="newPassword"/>
                    <FormInput content="Confirm new password" type="password" name="confirmNewPassword"/>

                    <p className="text-danger" hidden={error === ""}>
                        Password don't match or the email is invalid !
                    </p>

                    <button className="btn btn-success btn-lg btn-block" type="submit">Save</button>

                </div>
            </div>
        </form>
    )
}

export default ForgotPassword;