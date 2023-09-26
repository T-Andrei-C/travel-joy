import testImage from "./img/homeImage.jpg";

const HotelCard = ({accommodation}) => {
    return (
        <div className="card col-12 col-md-10 col-lg-8 border-success m-3">
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={testImage} className="card-img" alt={accommodation.name} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h3 className="card-title text-success">{accommodation.name}</h3>
                        <h6 className="card-title text-success">{accommodation.city.name}</h6>
                        <hr className="border-success" />
                        <p className="card-text">
                            This is a wider card with supporting text below as a natural lead-in to additional content. This
                            content is a little bit longer.
                        </p>
                        <a href="#" className="btn btn-success float-md-end mb-3">
                            View Details
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HotelCard;