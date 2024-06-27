import {FaMagnifyingGlass} from "react-icons/fa6";
import {getCities} from "../service/CRUDCity";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ITEMS_PER_PAGE} from "../service/API";

const HomeInput = () => {
    const [cities, setCity] = useState([]);
    const [selectPackages, setSelectPackages] = useState("");
    const [destination, setDestination] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getCities()
            .then((cities) => {
                setCity(cities);
            })
    }, []);

    const onSubmit = (e) =>
    {
        e.preventDefault();
        navigate("/" + selectPackages + "/" + destination + `/${ITEMS_PER_PAGE}/0`);
    }

    return (
        <form className="col-xl-6 col-lg-8 col-md-10 col-sm-11 col-11" onSubmit={onSubmit}>
            <div className="input-group input-group-sm mb-1">
                <span className="input-group-text bg-success text-white border-0" ><FaMagnifyingGlass/></span>
                <input list="cities" required={true} placeholder="Search city..." type="text" className="form-control" aria-label="Text input with dropdown button"
                onChange={event => setDestination(event.target.value)}/>
                <datalist id="cities">
                    {cities?.map(city => (
                        <option value={city.name} key={city.id}/>
                    ))}
                </datalist>
                <select required className="btn btn-success dropdown-toggle"
                        onChange={event => setSelectPackages(event.target.value)}>
                    <option key="dropdown" selected={true} disabled={true} hidden={true} value="">Dropdown</option>
                    <option key="accommodations" value="accommodations">Accommodations</option>
                    <option key="packages" value="packages">Packages</option>
                </select>
            </div>
            <div className="d-flex justify-content-center">
                <button  type="submit" className="btn btn-success">Search</button>
            </div>
        </form>
    )
}

export default HomeInput;