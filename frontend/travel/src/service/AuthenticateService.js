import axios, {AxiosError} from "axios";
import {API_URL} from "./API";
export const onSubmit = async (urlPath, setError, values, navigate,signIn) => {
    setError("");

    try {
        const response = await axios.post(
            API_URL + urlPath,
            values
        )

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