import {calculateDiscountPrice} from "../../service/PaymentService";

const ReviewOrder = ({checkIn, checkOut, city, room, housingName, discount}) => {
    const amount = calculateDiscountPrice(checkIn, checkOut, discount, room?.price);

    return (
        <div className="card-body p-lg-3 p-xl-3cd frontn p-md-3 text-center">
            <h3 className="mb-4">Review</h3>
            <div className="row ">
                <div className="col-6">
                    <h4 className="text-success">Details</h4>
                    <hr/>
                    <div className="text-start">
                        <h5>{housingName}, {city}</h5>
                        <h6>{room?.type.name} Room</h6>
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