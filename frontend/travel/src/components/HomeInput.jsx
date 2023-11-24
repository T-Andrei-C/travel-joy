import {FaMagnifyingGlass} from "react-icons/fa6";
import {getCity} from "../service/CRUDCity";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuthHeader} from "react-auth-kit";

const HomeInput = () => {
    const [cities, setCity] = useState([]);
    const [selectPackages, setSelectPackages] = useState("");
    const [destination, setDestination] = useState("");
    const navigate = useNavigate();
    const token = useAuthHeader();

    useEffect(() => {
        getCity(token())
            .then((cities) => {
                setCity(cities);
            })
    }, []);

    const onSubmit = (e) =>
    {
        e.preventDefault();
        navigate("/" + selectPackages + "/" + destination + "/3/0");
    }

    return (
        <form id="home-elements" onSubmit={onSubmit}>
            <div className="input-group mb-3 input-group-sm mb-3" id="input-and-drop">
                <span className="input-group-text text-bg-secondary" id="addon-wrapping"><FaMagnifyingGlass/></span>
                <input list="cities" required={true} placeholder="Search city..." type="text" className="form-control" aria-label="Text input with dropdown button"
                onChange={event => setDestination(event.target.value)}/>
                <datalist id="cities">
                    {cities?.map(city => (
                        <option value={city.name} key={city.id}/>
                    ))}
                </datalist>
                <select required className="btn btn-outline-light dropdown-toggle bg-secondary"
                        onChange={event => setSelectPackages(event.target.value)}>
                    <option key="dropdown" selected={true} disabled={true} hidden={true} value="">Dropdown</option>
                    <option key="accommodations" value="accommodations">Accommodations</option>
                    <option key="packages" value="packages">Packages</option>
                </select>
            </div>
            <div>
                <button id="home-search-btn" type="submit" className="btn btn-outline-light bg-success">Search</button>
            </div>
        </form>
    )
}

export default HomeInput;