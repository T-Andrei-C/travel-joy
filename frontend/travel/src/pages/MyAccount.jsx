import {useAuthUser} from "react-auth-kit";
import {useEffect, useState} from "react";
import {getAuthUser} from "../service/CRUDUsers";
import {useAuthHeader} from "react-auth-kit";

const MyAccount = () => {
    const headers = useAuthHeader();
    const [user, setUser] = useState();
    const authUser = useAuthUser();
    console.log(authUser());
    useEffect(() => {
        getAuthUser(headers).then((user) => {
            setUser(user);
        })
    }, []);

    console.log(user);

    return (
        <div></div>
    );
}

export default MyAccount;