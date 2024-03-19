import {HiArrowNarrowRight} from "react-icons/hi";
import Rating from "react-rating-stars-component";

const MyOrderCard = ({checkIn, checkOut, image, accommodationName, accommodationCity, price,typeRoom}) => {
    return(
        <div className="card" style={{width: "21rem"}}>
            <div className="row">
                <div className="col-6 ">
                    <h5 className="card-text mt-1 ms-2">{accommodationName}</h5>
                    <p className="card-text  ms-2 mb-2">{accommodationCity}</p>
                </div>
                <div className="col-6">
                    <div className="d-flex justify-content-end me-1">
                        <Rating
                            count={5}
                            size={23}
                            value={0}
                            // onChange={onChangeRating}
                            edit={true}
                            isHalf={true}
                            id="Rating"
                        />
                    </div>

                    <p className="text-end mt-1 me-1">{price} RON</p>
                </div>
            </div>
            <img src={image} className="card-img-top" alt=""/>
                <div className="card-body">
                    <div className="d-flex justify-content-start">
                        <h6>{checkIn}</h6>
                        <h6 className="ps-1 pe-1"><HiArrowNarrowRight/></h6>
                        <h6>{checkOut}</h6>
                    </div>
                    <h6>{typeRoom}</h6>
                </div>

        </div>
    );
}

export default MyOrderCard;