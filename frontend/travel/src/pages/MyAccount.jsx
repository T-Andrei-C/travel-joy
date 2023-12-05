import {useEffect, useState} from "react";
import {changePassword, getAuthUser} from "../service/CRUDUsers";
import {useAuthHeader} from "react-auth-kit";
import FormInput from "../components/FormInput";
import {useNavigate} from "react-router-dom";
import {useIsAuthenticated} from "react-auth-kit";
import Popup from "../components/Popup";

const MyAccount = () => {
    const token = useAuthHeader();
    const [user, setUser] = useState();
    const [visibility, setVisibility] = useState("hidden");
    const navigate = useNavigate();
    const isAuth = useIsAuthenticated();

    useEffect(() => {
        if (!isAuth()) {
            navigate("/login");
        }
        getAuthUser(token()).then((user) => {
            setUser(user);
        })
    }, []);

    const onSubmit = (changePasswordData) => {
        changePassword(token(), changePasswordData);
        document.cookie = "_auth_state=logout";
        navigate("/login");
        window.location.reload();
    }
    const onSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const changePasswordData = {
            currentPassword: formData.get("currentPassword"),
            newPassword: formData.get("newPassword"),
            confirmNewPassword: formData.get("confirmNewPassword")
        };
        onSubmit(changePasswordData);

    }
    return (
        <div className="col-12 row p-0 m-0 mt-5">
            <div className="col-lg-6 col-12 d-flex justify-content-center d-lg-flex">
                <form className="col-12">
                    <div className="col-10 col-md-8 col-lg-6 col-xl-4 card border-success rounded-4">
                        <div className="card-body p-lg-5 p-xl-5 p-md-5 text-center">
                            <h3 className="mb-5">Hello, {user?.firstname} {user?.lastname}!</h3>
                            <FormInput content="First name" type="text" name="firstname" test={user?.firstname}/>
                            <FormInput content="Last name" type="text" name="lastname" test={user?.lastname}/>
                            <div className="form-floating mb-4">
                                <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                                       htmlFor="floatingInputValue">Email</label>
                                <input type="email" name="email" disabled
                                       className="form-control form-control-lg border-success"
                                       required={true} value={user?.email} style={{fontSize: "1.1em"}}/>
                            </div>
                            <button className="btn btn-success btn-lg btn-block " type="submit">Save</button>
                        </div>
                    </div>
                </form>
            </div>
            {/*<p>Do you want to change your password?</p>*/}
            <div className="d-flex justify-content-center col-lg-6 col-12">
                <button className="btn btn-success btn-lg btn-block " onClick={() => setVisibility("")}
                        type="button">Change Password
                </button>
                <form onSubmit={onSave} hidden={visibility}>
                    <FormInput type="password" name="currentPassword" content="Current Password"/>
                    <FormInput type="password" name="newPassword" content="New Password"/>
                    <FormInput type="password" name="confirmNewPassword" content="Confirm Password"/>
                    <button type="submit">Change</button>
                </form>
            </div>
        </div>
    );
}

export default MyAccount;