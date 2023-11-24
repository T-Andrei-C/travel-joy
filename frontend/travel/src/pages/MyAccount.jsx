import {useAuthUser} from "react-auth-kit";
import {useEffect, useState} from "react";
import {getAuthUser} from "../service/CRUDUsers";
import {useAuthHeader} from "react-auth-kit";

const MyAccount = () => {
    const token = useAuthHeader();
    const [user, setUser] = useState();
    const authUser = useAuthUser();

    useEffect(() => {
        getAuthUser(token()).then((user) => {
            setUser(user);
        })
    }, []);


    return (
        <div></div>
    );
}

export default MyAccount;