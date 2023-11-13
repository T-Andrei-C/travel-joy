import ContactIcon from "../components/img/ContactIcon.svg"

const Contact = () => {

    const onSave = (e) => {

    }
    return (
        <div className="col-12 row mt-lg-5 mt-md-5 mt-3 p-0 m-0">
            <div className="col-lg-6 col-12 d-flex justify-content-center align-items-center d-lg-flex d-none">
                <img className="card-img col-6 my-4" src={ContactIcon} alt="contactIcon"/>
            </div>
            <form onSubmit={onSave} className="d-flex justify-content-center align-items-center col-lg-6 col-12">
                <div className="card border-success rounded-4">
                    <div className="card-body text-center">
                        <h3 className="mb-5">Get in touch with us</h3>
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <div className="form-floating">
                                    <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                                           htmlFor="floatingInputValue">First name</label>
                                    <input name="firstname" className="form-control form-control-lg border-success"
                                           required={true} style={{fontSize: "1.1em"}}/>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="form-floating">
                                    <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                                           htmlFor="floatingInputValue">Last name</label>
                                    <input name="lastname" type="text"
                                           className="form-control form-control-lg border-success" required={true}
                                           style={{fontSize: "1.1em"}}/>
                                </div>
                            </div>
                        </div>

                        <div className="form-floating mb-4">
                            <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                                   htmlFor="floatingInputValue">Phone Number</label>
                            <input name="phone" type="number" className="form-control form-control-lg border-success"
                                   required={true} style={{fontSize: "1.1em"}}/>
                        </div>

                        <div className="form-floating mb-4">
                            <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                                   htmlFor="floatingInputValue">Email</label>
                            <input name="email" type="email" className="form-control form-control-lg border-success"
                                   required={true} style={{fontSize: "1.1em"}}/>
                        </div>

                        <div className="form-floating mb-4">
                            <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                                   htmlFor="floatingInputValue">Message</label>
                            <textarea name="message" className="form-control form-control-lg border-success"
                                      required={true} style={{fontSize: "1.1em", height: "8em"}}/>
                        </div>

                        <button className="btn btn-success btn-lg btn-block" type="submit">SEND</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Contact