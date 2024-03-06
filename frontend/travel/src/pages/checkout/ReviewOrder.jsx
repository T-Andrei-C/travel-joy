const ReviewOrder = ({personalInfo}) => {
    return (
        <div className="card-body p-lg-3 p-xl-3 p-md-3 text-center">
            <h3 className="mb-4">Review</h3>
            <div className="row ">
                <div className="col-6">
                    <h4 className="text-success">Order details</h4>
                    <hr/>
                    {/*<div className="text-start">*/}
                    {/*    <h6>{personalInfo.firstname + " " + personalInfo.lastname}</h6>*/}
                    {/*    <h6>{personalInfo.phoneNumber}</h6>*/}
                    {/*    <h6>{personalInfo.country + ", " + personalInfo.county + ", " + personalInfo.city}</h6>*/}
                    {/*</div>*/}
                </div>
                <div className="col-6">
                    <h4 className="text-success">Total</h4>
                    <hr/>
                    {/*<div className="text-end">*/}

                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
}

export default ReviewOrder;