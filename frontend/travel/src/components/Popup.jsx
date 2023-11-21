const Popup = () => {
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-center">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Oops! Fill in travel details for adventure!</h1>
                    </div>
                    <div className="modal-body">
                        We share your excitement to discover our offers! Just one more step: complete the search fields before unlocking the next stage.
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup;