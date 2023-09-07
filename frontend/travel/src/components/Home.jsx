import {useEffect, useState} from "react";
import {getCity} from "../service/CRUDCity";
import homeImage from "./img/homeImage.jpg";
import { FaMagnifyingGlass } from "react-icons/fa6"


const Home = () => {
    const [cities, setCity] = useState([]);


    useEffect(() => {
        getCity()
            .then((cities) => {
                setCity(cities);
            })
    }, []);
    return(
        <>
        <div className="blur">
            <img src={homeImage} className="img-fluid"/>
        </div>

        <div className="message">
            <h1 className="text-center text-white" id="description-txt">
                Explore the unknown place's of
                <big id="romania"> Romania</big>
            </h1>
        </div>
            <div className="input-group flex-nowrap" id="searchDiv">
                <span className="input-group-text" id="addon-wrapping"><FaMagnifyingGlass/></span>
                <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping"/>
            </div>
        </>
    );
}

export default Home;