import {useEffect, useState} from "react";
import {getCity} from "../service/CRUDCity";
import homeImage from "../components/img/homeImage.jpg";
import Input from "../components/home-page/Input"


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
            <Input/>
        </>
    );
}

export default Home;