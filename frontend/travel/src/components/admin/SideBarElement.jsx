import {NavLink} from "react-router-dom";

const SideBarElement = ({to, icon, name, url, setUrl}) => {
    return (
        <button className={`btn btn-success rounded-0 m-0 p-0 p-1 ${url.includes(to) && "active"}`}>
            <NavLink to={to} className="nav-item nav-link" onClick={() => setUrl(to)}>
                <p className="m-0">{icon}</p>
                <p className="m-0">{name}</p>
            </NavLink>
        </button>
    )
}

export default SideBarElement;