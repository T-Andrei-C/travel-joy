import {useEffect, useState} from "react";
import {getCity} from "../service/CRUDCity";


const Home = () => {
    const [cities, setCity] = useState([]);


    useEffect(() => {
        getCity()
            .then((cities) => {
                setCity(cities);
            })
    }, []);
    return(
        <div>
            {cities.map(c => (
                <h1>{c.name}</h1>
            ))}
        </div>
    );
}

export default Home;