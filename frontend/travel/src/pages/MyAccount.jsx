import {useEffect, useState} from "react";
import {changePassword, disableUserAccount, getAuthUser} from "../service/CRUDUsers";
import {useAuthHeader} from "react-auth-kit";
import FormInput from "../components/FormInput";
import {useNavigate} from "react-router-dom";
import {useIsAuthenticated} from "react-auth-kit";
import ActionPopup from "../components/ActionPopup";


const MyAccount = () => {
    const token = useAuthHeader();
    const [user, setUser] = useState();
    const [visibility, setVisibility] = useState("hidden");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const isAuth = useIsAuthenticated();
    console.log(user);

    useEffect(() => {
        if (!isAuth()) {
            navigate("/login");
        }
        getAuthUser(token()).then((user) => {
            setUser(user);
        })
    }, []);

    const onSubmit = async (changePasswordData) => {
        try {
            setError(false);
            const response = await changePassword(token(), changePasswordData);
            if (response.message === "Password are not the same") {
                setError(true);
            } else {
                document.cookie = "_auth_state=logout";
                navigate("/login");
                window.location.reload();
            }

        } catch (err) {
            console.log(err);

        }

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

    const disableAccount = async () => {
        await disableUserAccount(token());
        document.cookie = "_auth_state=logout";
        navigate("/");
        window.location.reload();
    }

    return (
        <>
            <div className="row p-0 m-0 mt-5">
                <form className="col-10 col-sm-8 col-lg-6 col-md-6 align-content-center mx-auto">
                    <div className="col-12 col-md-12 col-lg-10 col-xl-8 card border-success rounded-4 ms-lg-5">
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

                <div className="col-lg-6 col-sm-12  col-12 mt-4 text-center">
                    <h3 className="text-center">Do you want to change your password?</h3>
                    <button className="btn btn-success btn-lg btn-block mt-2 " onClick={() => setVisibility("")}
                            type="button">Change Password
                    </button>
                    <form onSubmit={onSave} className="mt-4 col-6 align-content-center mx-auto" hidden={visibility}>
                        <FormInput type="password" name="currentPassword" content="Current Password"/>
                        <FormInput type="password" name="newPassword" content="New Password"/>
                        <FormInput type="password" name="confirmNewPassword" content="Confirm Password"/>
                        <p className="text-danger" hidden={!error}>Current or New Password are invalid!</p>
                        <button className="btn btn-success btn-lg btn-block" type="submit">Change</button>
                    </form>
                </div>
            </div>
            <div className="text-center mt-5 pt-5">
                <button data-bs-toggle="modal" data-bs-target="#disableAccount" className="btn btn-danger btn-lg btn-block">Delete Account</button>
            </div>
            <ActionPopup
                content="Are you sure you want to log out? You may lose unsaved progress."
                header="Verify Logout"
                onSubmit={disableAccount}
                btnText="Disable"
                id="disableAccount"
            />
        </>
    );
}

export default MyAccount;