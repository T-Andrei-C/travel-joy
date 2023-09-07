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
                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
                    <ul className="dropdown-menu dropdown-menu-end ">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><a className="dropdown-item" href="#">Separated link</a></li>
                    </ul>
            </div>
            <div>
                <button id="home-button" type="button" className="btn btn-outline-success">Success</button>
            </div>
            </div>
            {/*<div className="input-group flex-nowrap" id="searchDiv">*/}
            {/*    <span className="input-group-text" id="addon-wrapping"><FaMagnifyingGlass/></span>*/}
            {/*    <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="addon-wrapping"/>*/}
            {/*</div>*/}
        </>
    );
}

export default Home;