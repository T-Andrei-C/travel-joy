import {API_URL} from "./API";

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
        if (response.message === "Access Denied") {
            setError(response.message)
        } else {
            signIn({
                token: response.token,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: {email: values.email},
            })
            navigate("/");
        }
    } catch (err) {
        console.log(err);
    }
}