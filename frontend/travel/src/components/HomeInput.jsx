import {FaMagnifyingGlass} from "react-icons/fa6";
import {getCities} from "../service/CRUDCity";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ITEMS_PER_PAGE} from "../service/API";

const HomeInput = () => {
    const [cities, setCity] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCities()
            .then((cities) => {
                setCity(cities);
            })
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        navigate("/" + form.get("type") + "/" + form.get("city") + `/${ITEMS_PER_PAGE}/0`);
    }

    return (
        <form className="col-xl-6 col-lg-8 col-md-10 col-sm-11 col-11" onSubmit={onSubmit}>
            <div className="input-group input-group-sm mb-1">
                <span className="input-group-text bg-success text-white border-0"><FaMagnifyingGlass/></span>
                <input name="city" type="text" required={true} placeholder="Search city..." list="cities" className="form-control"/>
                <datalist id="cities">
                    {
                        cities && cities?.map(city => (
                            <option value={city.name} key={city.id}/>
                        ))
                    }
                </datalist>
                <select required className="btn btn-success dropdown-toggle" name="type">
                    <option key="accommodations" value="accommodations">Accommodations</option>
                    <option key="packages" value="packages">Packages</option>
                </select>
            </div>
            <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-success">Search</button>
            </div>
        </form>
    )
}

export default HomeInput;