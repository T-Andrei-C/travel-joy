import ContactIcon from "../components/img/ContactIcon.svg"
const Contact = () => {

    const onSave = (e) => {

    }
    return(
        <div className="mt-xl-5 container-fluid d-flex justify-content-center text-center row row-cols-xl-3 row-cols-lg-3 row-cols-md-2 row-cols-1">
            <div className="w-auto justify-content-center me-xl-5 me-xl-4 me-lg-4 me-md-0 ms-xl-0 ms-lg-0 ms-md-5 mt-4 d-xl-flex d-lg-flex d-md-flex d-none">
                <img className="card-img" src={ContactIcon} alt="contactIcon"/>
            </div>
            <form onSubmit={onSave} className="d-flex justify-content-center ms-4 w-auto ms-xl-5" style={{marginTop: "1em"}}>
                <div className="card border-success rounded-4">
                    <div className="card-body text-center">
                        <h3 className="mb-5">Get in touch with us</h3>
                        <div className="row">
                            <div className="col-md-6 mb-4">
                                <div className="form-floating">
                                    <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                                           htmlFor="floatingInputValue">First name</label>
                                    <input name="firstname" className="form-control form-control-lg border-success" required={true} style={{fontSize: "1.1em"}}/>
                                </div>
                            </div>
                            <div className="col-md-6 mb-4">
                                <div className="form-floating">
                                    <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                                           htmlFor="floatingInputValue">Last name</label>
                                    <input name="lastname" type="text" className="form-control form-control-lg border-success" required={true} style={{fontSize: "1.1em"}}/>
                                </div>
                            </div>
                        </div>

                        <div className="form-floating mb-4">
                            <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                                   htmlFor="floatingInputValue">Phone Number</label>
                            <input name="phone" type="number" className="form-control form-control-lg border-success" required={true} style={{fontSize: "1.1em"}}/>
                        </div>

                        <div className="form-floating mb-4">
                            <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                                   htmlFor="floatingInputValue">Email</label>
                            <input name="email" type="email" className="form-control form-control-lg border-success" required={true} style={{fontSize: "1.1em"}}/>
                        </div>

                        <div className="form-floating mb-4">
                            <label className="pt-1 text-success fw-bold" style={{fontSize: "0.75em"}}
                                   htmlFor="floatingInputValue">Message</label>
                            <textarea name="message" className="form-control form-control-lg border-success" required={true} style={{fontSize: "1.1em", height: "8em"}}/>
                        </div>

                        <button className="btn btn-success btn-lg btn-block" type="submit">SEND</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Contact