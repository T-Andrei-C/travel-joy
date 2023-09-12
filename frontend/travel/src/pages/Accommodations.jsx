import {useState,useEffect} from "react";
import {getAccommodations} from "../service/CRUDAccommodations";
import testImage from "../components/img/homeImage.jpg";

const Accommodations = () =>{
    const[accommodations,setAccommodations] = useState([]);

    useEffect(() => {
        getAccommodations()
            .then((accommodations) => {
                setAccommodations(accommodations);
            })
    }, []);

    return(
        <div className="d-flex align-items-center justify-content-center">
            {accommodations.length !== 0 && accommodations.map(a =>
                <div key={a.id} className="card col-12  border-success m-5" style={{maxWidth : "850px"}}>
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img src={testImage} className="card-img"  />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h3 className="card-title text-success">{a.name}</h3>
                                <h6 className="card-title text-success">{a.city.name}</h6>
                                <hr className="border-success"/>
                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <a href="#" className="btn btn-success float-md-end mb-3" >View Details</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

 export default Accommodations