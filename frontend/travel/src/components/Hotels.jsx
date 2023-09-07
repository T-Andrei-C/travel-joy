import {useEffect, useState} from "react";

const fetchHotels = async () => {
    return fetch("http://localhost:8080/travel/api/accommodations").then(res => res.json());
}
export default function Hotels () {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        fetchHotels()
            .then((accommodations) => {
                setHotels(accommodations);
            })
    }, []);

    return(
        <div>
            {/*{hotels.map(h => (*/}
            {/*    <h1>{h.name}</h1>*/}
            {/*    */}
            {/*))}*/}

        </div>
    );
}