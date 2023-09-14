import {FaMagnifyingGlass} from "react-icons/fa6";
import {getCity} from "../../service/CRUDCity";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const Input = () => {
    const [cities, setCity] = useState([]);
    const [selectPackages, setSelectPackages] = useState("");
    const [destination, setDestination] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getCity()
            .then((cities) => {
                setCity(cities);
            })
    }, []);

    return (
        <div id="home-elements" className="">
            <div className="input-group mb-3 input-group-sm mb-3" id="input-and-drop">
                <span className="input-group-text text-bg-secondary" id="addon-wrapping"><FaMagnifyingGlass/></span>
                <input list="cities" required placeholder="Search city..." type="text" className="form-control" aria-label="Text input with dropdown button"
                onChange={event => setDestination(event.target.value)}/>
                <datalist id="cities">
                    {cities?.map(city => (
                        <option value={city.name} key={city.id}/>
                    ))}
                </datalist>
                <select className="btn btn-outline-light dropdown-toggle bg-secondary"
                        onChange={event => setSelectPackages(event.target.value)}>
                    <option selected={true} disabled={true} hidden={true} >Dropdown</option>
                    <option value="accommodations">Accommodations</option>
                    <option value="packages">Packages</option>
                </select>
            </div>
            <div>
                <button id="home-search-btn" type="button" className="btn btn-outline-light bg-success"
                onClick={() => navigate("/" + selectPackages + "/" + destination + "/10/1")}
                >Search</button>
            </div>
        </div>
    )
}

export default Input;