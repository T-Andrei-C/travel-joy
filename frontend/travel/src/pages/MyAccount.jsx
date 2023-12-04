import {useEffect, useState} from "react";
import {changePassword, getAuthUser} from "../service/CRUDUsers";
import {useAuthHeader} from "react-auth-kit";
import FormInput from "../components/FormInput";
import {useNavigate} from "react-router-dom";
import {useIsAuthenticated} from "react-auth-kit";

const MyAccount = () => {
    const token = useAuthHeader();
    const [user, setUser] = useState();
    const [visibility,setVisibility] = useState("hidden");
    const navigate = useNavigate();
    const isAuth = useIsAuthenticated();

    useEffect(() => {
        if(!isAuth()){
            navigate("/login");
        }
        getAuthUser(token()).then((user) => {
            setUser(user);
        })
    }, []);

    const onSubmit = (changePasswordData) =>{
        changePassword(token(),changePasswordData);
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
            confirmNewPassword:formData.get("confirmNewPassword")
        };
        onSubmit(changePasswordData);

    }
    return (
        <div>
            <button onClick={() => setVisibility("")}>Change Password</button>
            <form onSubmit={onSave} hidden={visibility}>
                <FormInput type="password" name="currentPassword" content="Current Password"/>
                <FormInput type="password" name="newPassword" content="New Password"/>
                <FormInput type="password" name="confirmNewPassword" content="Confirm Password"/>
                <button type="submit">Change</button>
            </form>
        </div>
    );
}

export default MyAccount;