import {FaMagnifyingGlass} from "react-icons/fa6";

const Input = () => {
    return (
        <div id="home-elements">
            <div className="input-group mb-3 input-group-sm mb-3" id="input-and-drop">
                <span className="input-group-text text-bg-secondary" id="addon-wrapping"><FaMagnifyingGlass/></span>
                <input required type="text" className="form-control" aria-label="Text input with dropdown button"/>
                <button className="btn btn-outline-light dropdown-toggle bg-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
                <ul className="dropdown-menu dropdown-menu-end ">
                    <li><a className="dropdown-item" href="#">Hotels</a></li>
                    <li><a className="dropdown-item" href="#">Packages</a></li>
                </ul>
            </div>
            <div>
                <button id="home-button" type="button" className="btn btn-outline-light bg-success">Success</button>
            </div>
        </div>
    )
}

export default Input;