import {useState,useEffect} from "react";
import {getAccommodations} from "../service/CRUDAccommodations";

const Accommodations = () =>{
    const[accommodations,setAccommodations] = useState([]);

    useEffect(() => {
        getAccommodations()
            .then((accommodations) => {
                setAccommodations(accommodations);
            })
    }, []);

    return(
        <div>{accommodations.length !== 0 && accommodations[0].name}</div>
    );
}

 export default Accommodations