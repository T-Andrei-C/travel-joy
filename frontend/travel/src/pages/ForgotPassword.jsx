import FormInput from "../components/FormInput";
import {useEffect, useState} from "react";
import {forgotPassword} from "../service/CRUDUsers";
import {useNavigate, useParams} from "react-router-dom";
import {getMailExpiration} from "../service/CRUDEmail";

const ForgotPassword = () => {

    const [mailExpiration, setMailExpiration] = useState();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { uuid } = useParams();

    useEffect(() => {
        getMailExpiration(uuid).then(mail => {
            if (mail.status >= 400){
                navigate("/error");
            }
            setMailExpiration(mail);
        })

    },[])

    console.log(mailExpiration);

    const onSubmit = async (forgotPasswordData) => {
        setError("");
        try {
            const response = await forgotPassword(forgotPasswordData);
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
            email: mailExpiration.user.email,
            newPassword: formData.get("newPassword"),
            confirmNewPassword: formData.get("confirmNewPassword"),
            uuid:mailExpiration.uuid
        };
        onSubmit(forgotPasswordData);
    }

    return (
        <form onSubmit={onSave} className="d-flex justify-content-center" style={{marginTop: "6em"}}>
            <div className="col-10 col-md-8 col-lg-6 col-xl-4 card border-success rounded-4">
                <div className="card-body p-lg-5 p-xl-5 p-md-5 text-center">
                    <h3 className="mb-5">Update Password</h3>

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