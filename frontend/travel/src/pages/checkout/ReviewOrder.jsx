import {totalPrice} from "../../service/PaymentService";
import {HiArrowNarrowRight} from "react-icons/hi";

const ReviewOrder = ({checkIn, checkOut, city, room, travelPackage, housingName}) => {
    const amount = room === null ? travelPackage?.price  : totalPrice(checkIn, checkOut) * room?.price;
    return (
        <div className="card-body p-lg-3 p-xl-3 p-md-3 text-center">
            <h3 className="mb-4">Review</h3>
            <div className="row ">
                <div className="col-6">
                    <h4 className="text-success">Details</h4>
                    <hr/>
                    <div className="text-start">
                        <h5>{housingName}, {city}</h5>
                        <h6>{room === null ? travelPackage?.room.type.toLowerCase().replace(/^\w/, (c) => c.toUpperCase()) : room?.type.toLowerCase().replace(/^\w/, (c) => c.toUpperCase())} Room</h6>
                        <div className="d-flex justify-content-start">
                            <h6>{checkIn}</h6>
                            <h6 className="ps-1 pe-1"><HiArrowNarrowRight/></h6>
                            <h6>{checkOut}</h6>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <h4 className="text-success">Total</h4>
                    <hr/>
                    <h5 className="text-center">
                        {amount} RON
                    </h5>
                </div>
            </div>
        </div>
    );
}

export default ReviewOrder;