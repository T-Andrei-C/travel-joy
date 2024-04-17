import Rating from "react-rating-stars-component";

const HotelRating = ({value, numberOfRatings}) => {
    return (
        <>
            <div className="">
                <Rating
                    count={5}
                    size={20}
                    value={value}
                    edit={false}
                    isHalf={true}
                    id="Rating"
                />
            </div>
            <p className="text-black-50 ms-1" style={{fontSize: "0.8em", marginTop: "0.5em"}}>({numberOfRatings})</p>
        </>
    )
}

export default HotelRating;