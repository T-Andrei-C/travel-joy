import {useEffect, useState} from "react";
import {
    disableOrEnableAccommodation,
    getAccommodationImage,
    getAllAccommodations
} from "../../service/CRUDAccommodations";
import {useNavigate} from "react-router-dom";
import {FaEdit, FaPlus} from "react-icons/fa";
import {FaLocationDot} from "react-icons/fa6";
import {MdBed} from "react-icons/md";
import {BsDot} from "react-icons/bs";
import Alert from "../Alert";
import CheckboxInput from "./CheckboxInput";
import {useAuthHeader} from "react-auth-kit";

const ViewHotels = () => {
    const [accommodations, setAccommodations] = useState(null);
    const [alert, setAlert] = useState([]);
    const navigate = useNavigate();
    const token = useAuthHeader();

    console.log(token())

    useEffect(() => {
        getAllAccommodations(token()).then(accommodations => {
            setAccommodations(accommodations);
        })
    }, [])

    const disableOrEnable = async (id) => {
        const response = await disableOrEnableAccommodation(id);
        await setAlert([...alert, response]);
        return await response.type === "success";
    }

    return (
        <div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-success mb-3" onClick={() => navigate("add")}><FaPlus
                    className="mb-1"/></button>
            </div>
            <div className="row row-cols-xl-3 row-cols-lg-3 row-cols-md-2">
                {
                    accommodations && accommodations.map(accommodation => (
                        <div className="card text-bg-dark bg-transparent border-0 mb-4">
                            <div className="bg-black rounded">
                                <img src={getAccommodationImage(accommodation.id)}
                                     className="card-img img-fluid h-100 opacity-50"
                                     onError={(e) => e.target.src = "https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png"}
                                     alt="..."/>
                            </div>
                            <div className="card-img-overlay p-0 ms-3 me-3">
                                <div className="d-flex justify-content-between">
                                    <h4 className="card-title mb-0">{accommodation.name}</h4>
                                    <div className="d-xl-flex d-lg-flex d-md-flex d-sm-flex d-block">
                                        <button onClick={() => navigate(`${accommodation.id}`)}
                                                className="card-title bg-transparent border-0 mb-0"><FaEdit
                                            className="fs-4"/>
                                        </button>
                                        <CheckboxInput onChange={disableOrEnable} id={accommodation.id}
                                                       value={accommodation.disabled} className="m-xl-auto m-lg-auto m-md-atuo m-sm-auto m-0"/>
                                    </div>
                                </div>
                                <p className="card-text pt-0"><FaLocationDot className="mb-1"/> {accommodation.city.name}
                                    <BsDot/> {accommodation.capacity} <MdBed/></p>
                                <p className="card-text">{accommodation.description}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
            <Alert alertData={alert} alertCallBack={setAlert}/>
        </div>
    )
}

export default ViewHotels;