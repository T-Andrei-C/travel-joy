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
        <div className="cards-container ">
            {accommodations.length !== 0 && accommodations.map(a =>
                <div key={a.id} className=" card col-6 mb-3 border-success m-5" style={{maxWidth : "650px"}}>
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img src={testImage} className="card-img" style={{height:"11em"}} />
                            <div className="card-img-overlay">
                                <h6 className="card-title">{a.name}</h6>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{a.city.name}</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

 export default Accommodations