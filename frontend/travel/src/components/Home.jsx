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
            <div id="home-elements">
            <div className="input-group mb-3 input-group-sm mb-3" id="input-and-drop">
                <span className="input-group-text text-bg-secondary" id="addon-wrapping"><FaMagnifyingGlass/></span>
                <input type="text" className="form-control" aria-label="Text input with dropdown button"/>
                    <button className="btn btn-outline-light dropdown-toggle bg-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
                    <ul className="dropdown-menu dropdown-menu-end ">

                    </ul>
            </div>
            <div>
                <button id="home-button" type="button" className="btn btn-outline-light bg-success">Success</button>
            </div>
            </div>
        </>
    );
}

export default Home;