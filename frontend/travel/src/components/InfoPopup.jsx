const InfoPopup = ({header, content}) => {
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-center">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{header}</h1>
                    </div>
                    <div className="modal-body">{content}</div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoPopup;