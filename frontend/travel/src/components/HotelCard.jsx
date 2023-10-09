import {FaLocationDot} from "react-icons/fa6";
import {BsFillHouseCheckFill, BsSlash} from "react-icons/bs";


const HotelCard = ({accommodation}) => {
    return (
        <div className="card col-12 col-md-10 col-lg-8 border-success m-3">
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={accommodation.image_url?.image_url} className="card-img" alt={accommodation.name}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className="col-12 d-flex justify-content-between p-0">
                            <h3 className="card-title text-success ps-1">{accommodation.name}</h3>
                        </div>
                        <div className="ps-1 col-12 d-flex" style={{marginBottom: "-0.5em"}}>
                            <h6 className="card-title text-success pe-1">{<FaLocationDot/>}</h6>
                            <h6 className="card-title text-success"
                                style={{paddingTop: "0.1em"}}>{accommodation.city.name}</h6>
                        </div>

                        <hr className="border-success"/>
                        <div className="row">
                            <div className="col-xl-9 col-12">
                                <div className="ps-1 col-12 d-flex">
                                    <p className="ps-1 pt-1 fw-bold">
                                        <BsFillHouseCheckFill/>
                                        {accommodation.accommodation_facilities?.map(f => (
                                            f.name === accommodation.accommodation_facilities[accommodation.accommodation_facilities.length - 1].name ?
                                                <span style={{fontSize: "13px"}} > {f.name.toUpperCase()} </span> :
                                                <span style={{fontSize: "13px"}}> {f.name.toUpperCase()}<BsSlash/></span>
                                        ))
                                        }
                                    </p>
                                </div>
                                <div className="ps-1 col-12 d-flex" style={{marginTop: "-0.5em"}}>
                                    {/*<p><FaPencilAlt/></p>*/}
                                    <p className="ps-1 pt-1  "
                                       style={{fontSize: "15px"}}>{accommodation.description}</p>
                                </div>
                            </div>
                            <div className="my-auto col-xl-3 col-12 ">
                                <a href="#" className="btn btn-success float-md-end mb-3 col-12">
                                    View Details
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotelCard;