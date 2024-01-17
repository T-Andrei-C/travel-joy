const ActionPopup = ({header, content, onSubmit, btnText, id}) => {
    return (
        <div className="modal fade" id={id} tabIndex="-1"
             aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header position-relative">
                        <h1 className="modal-title fs-5 position-absolute top-50 start-50 translate-middle"
                            id="exampleModalLabel">{header}</h1>
                        <button type="button" className="btn-close d-flex align-content-end" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-center">{content}
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button onClick={onSubmit} type="button" className="btn btn-success"
                                data-bs-dismiss="modal">{btnText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActionPopup;