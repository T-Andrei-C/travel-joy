import ErrorIcon from "../components/img/ErrorIcon.svg"
import {useNavigate} from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="text-center">
                <img className="col-10 col-xl-4 col-lg-4 col-md-5 col-sm-6 " src={ErrorIcon}/>
            </div>
            <div className="text-center">
                <h4>Sorry, the page you are looking for is unavailable.</h4>
                <button className="btn btn-success btn-lg btn-block mt-3" type="submit" onClick={() => navigate("/")}>Back to Homepage</button>
            </div>

        </>


    )
}

export default Error;