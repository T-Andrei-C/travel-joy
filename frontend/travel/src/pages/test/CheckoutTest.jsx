import Review from "../checkout/Review";
// import * as React from "react";
import {useEffect, useState} from "react";
import Payment from "./Payment";
import {useNavigate} from "react-router-dom";
import {useIsAuthenticated} from "react-auth-kit";
import AddressFormTest from "./AddressFormTest";
import {useElements, useStripe} from "@stripe/react-stripe-js";
import ReviewOrder from "./ReviewOrder";

const CheckoutTest = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [personalInfo, setPersonalInfo] = useState({});
    const navigate = useNavigate();
    const isAuth = useIsAuthenticated();
    const getStepContent = (step) => {
        switch (step) {
            case 1:
                return <AddressFormTest data={personalInfo}/>;
            case 2:
                return <Payment/>;
            case 3:
                return <ReviewOrder personalInfo={personalInfo}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    useEffect(() => {
        if (!isAuth()) {
            navigate("/login");
        }
    }, [])
    const handleNext = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (activeStep === 1) {
            setPersonalInfo(
                {
                    firstname:formData.get("firstname"),
                    lastname:formData.get("lastname"),
                    email: formData.get("email"),
                    phoneNumber: formData.get("phoneNumber"),
                    country: formData.get("country"),
                    county: formData.get("county"),
                    city: formData.get("city")
                }
            )
        }
        console.log(personalInfo);
        setActiveStep(activeStep + 1);
    };

    const handleBack = (e) => {
        e.preventDefault();
        setActiveStep(activeStep - 1);
    };
    return (
        <form onSubmit={handleNext} className="d-flex justify-content-center " style={{marginTop: "2em"}}>
            <div className="col-10 col-md-8 col-lg-6 col-xl-4 card border-success-subtle border-2 rounded-4">
                {getStepContent(activeStep)}
                <div className="text-center mb-4">
                    <button className="btn btn-success btn-md btn-block me-1" onClick={handleBack} disabled={activeStep === 1}>Back</button>
                    <button className="btn btn-success btn-md btn-block ms-1" type="submit">  {activeStep === 3 ? 'Place order' : 'Next'}</button>
                </div>

            </div>

        </form>
    );
}

export default CheckoutTest;