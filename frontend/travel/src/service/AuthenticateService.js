import {API_URL} from "./API";
import {useAuthHeader} from "react-auth-kit";

export const onSubmit = async (urlPath, setError, values, navigate, signIn) => {
    setError("");

    try {
        const request = await fetch(`${API_URL}${urlPath}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        });
        const response = await request.json();

        // if (response.message === "Access Denied") {
        //     setError(response.message)
        console.log(response)
        if (response.type === "danger"){
            setError(response.response);
        } else {
            const date = new Date(Date.now());
            date.setHours(date.getHours() + 100);

            document.cookie = `_auth_state={%22email%22:%22${values.email}%22}; expires=${date}; path='/'"`;
            document.cookie = `_auth_storage=${date.toISOString()}; expires=${date}; path='/'"`;
            document.cookie = `_auth=${response.token}; expires=${date}; path='/'"`;
            document.cookie = `_auth_type=Bearer; expires=${date}; path='/'`;
            // signIn({
            //     token: response.token,
            //     expiresIn: 3600,
            //     tokenType: "Bearer",
            //     authState: {email: values.email},
            // })
            navigate("/");
            window.location.reload();
        }
    } catch (err) {
        console.log(err);
    }
}

export const getToken = () => {
    const cookies = document.cookie.split(" ").find(cookie => cookie.split("=")[0] === "_auth");
    return cookies !== undefined ? `Bearer ${cookies.split("=")[1]}` : " "
}