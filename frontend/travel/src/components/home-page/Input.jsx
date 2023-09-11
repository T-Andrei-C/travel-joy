import {FaMagnifyingGlass} from "react-icons/fa6";
import {getCity} from "../../service/CRUDCity";
import {useEffect, useState} from "react";

const Input = () => {
    const [cities, setCity] = useState([]);

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
                <input list="cities" required placeholder="Search city..." type="text" className="form-control" aria-label="Text input with dropdown button"/>
                <datalist id="cities">
                    {cities?.map(city => (
                        <option value={city.name} key={city.id}/>
                    ))}
                </datalist>
                <button className="btn btn-outline-light dropdown-toggle bg-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li><a className="dropdown-item">Hotels</a></li>
                    <li><a className="dropdown-item">Packages</a></li>
                </ul>
            </div>
            <div>
                <button id="home-search-btn" type="button" className="btn btn-outline-light bg-success">Search</button>
            </div>
        </div>
    )
}

export default Input;