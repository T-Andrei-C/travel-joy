import {useNavigate} from "react-router-dom";

const Pagination = ({travelBundles, link, numberOfPage}) => {
    const navigate = useNavigate();

    return (
        <div className="d-flex justify-content-evenly mt-5">
            <ul className="pagination">
                <li className={travelBundles.number === 0 ? "page-item btn-outline-success disabled" : "page-item btn-outline-success"}>
                    {/*<a className="page-link" onClick={() => navigate(`/${type}/${travelBundles.size}/${(travelBundles.number - 1)}`)}>Back</a>*/}
                    <a className="page-link" onClick={() => navigate(`/${link}/${numberOfPage - 1}`)}>Back</a>
                </li>
                {
                    Array.from(Array(travelBundles.totalPages).keys()).map((i) => (
                        // <li className={i === travelBundles.number ? "active" : ""}><a className="page-link"  onClick={() => navigate(`/${type}/${travelBundles.size}/${i}`)}>{i + 1}</a></li>
                        <li key={i} className={i === travelBundles.number ? "active" : ""}><a className="page-link"  onClick={() => navigate(`/${link}/${i}`)}>{i + 1}</a></li>
                    ))
                }
                <li className={travelBundles.number >= travelBundles.totalPages - 1 ? "page-item btn-outline-success disabled" : "page-item btn-outline-success"}>
                    <a className="page-link" onClick={() => navigate(`/${link}/${numberOfPage + 1}`)}>Next</a>
                </li>
            </ul>
        </div>
    )
}

export default Pagination;