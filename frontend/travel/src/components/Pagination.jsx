import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {
    MdOutlineFirstPage,
    MdOutlineLastPage,
    MdOutlineNavigateBefore,
    MdOutlineNavigateNext
} from "react-icons/md";


const Pagination = ({travelBundles, link, numberOfPage}) => {
    const navigate = useNavigate();

    // number of pages to the left of current page, number of pages to the right of current page including page
    const [paginationNumbers, setPaginationNumbers] = useState([]);

    useEffect(() => {
        if (numberOfPage + 1 === travelBundles.totalPages) {
            setPaginationNumbers([3, 1]);
        } else if (numberOfPage === travelBundles.totalPages) {
            setPaginationNumbers([4, 0]);
        } else {
            if (numberOfPage === 0) {
                setPaginationNumbers([0, 4]);
            } else if (numberOfPage === 1) {
                setPaginationNumbers([1, 3]);
            } else if (numberOfPage >= 2) {
                setPaginationNumbers([2, 2]);
            }
        }
    }, [numberOfPage])

    return (
        <div className="d-flex justify-content-evenly mt-5">
            <ul className="pagination">
                <li className={numberOfPage === 0 ? "page-item btn-outline-success disabled" : "page-item btn-outline-success"}>
                    <a className="page-link"
                       onClick={() => navigate(`/${link}/0`)}><MdOutlineFirstPage className="pb-1"/></a>
                </li>
                <li className={travelBundles?.number === 0 ? "page-item btn-outline-success disabled" : "page-item btn-outline-success"}>
                    <a className="page-link"
                       onClick={() => navigate(`/${link}/${numberOfPage - 1}`)}><MdOutlineNavigateBefore
                        className="pb-1"/></a>
                </li>
                {
                    travelBundles.totalPages <= 4 ?
                        Array.from(Array(travelBundles.totalPages).keys()).map((i) => (
                            <li key={i} className={i === travelBundles.number ? "active" : ""}>
                                <a className="page-link" onClick={() => navigate(`/${link}/${i}`)}>{i + 1}</a>
                            </li>
                        )) :
                        <>
                            {
                                Array.from(Array(paginationNumbers[0]).keys()).toReversed().map(i => (
                                    <li key={i} className={i === travelBundles.number ? "active" : ""}>
                                        <a className="page-link"
                                           onClick={() => navigate(`/${link}/${numberOfPage <= 1 ? i : numberOfPage - i - 1}`)}>{numberOfPage <= 1 ? i + 1 : numberOfPage - i}</a>
                                    </li>
                                ))
                            }
                            {
                                Array.from(Array(paginationNumbers[1]).keys()).map(i => (
                                    <li key={i + travelBundles.number}
                                        className={i + travelBundles.number === travelBundles.number ? "active" : ""}>
                                        <a className="page-link"
                                           onClick={() => navigate(`/${link}/${i + travelBundles.number}`)}>{i + travelBundles.number + 1}</a>
                                    </li>
                                ))
                            }
                        </>
                }
                <li className={travelBundles.number >= travelBundles.totalPages - 1 ? "page-item btn-outline-success disabled" : "page-item btn-outline-success"}>
                    <a className="page-link"
                       onClick={() => navigate(`/${link}/${numberOfPage + 1}`)}><MdOutlineNavigateNext
                        className="pb-1"/></a>
                </li>
                <li className={numberOfPage + 1 === travelBundles.totalPages || travelBundles.totalPages === 0 ? "page-item btn-outline-success disabled" : "page-item btn-outline-success"}>
                    <a className="page-link"
                       onClick={() => navigate(`/${link}/${travelBundles.totalPages - 1}`)}><MdOutlineLastPage
                        className="pb-1"/></a>
                </li>
            </ul>
        </div>
    )
}

export default Pagination;