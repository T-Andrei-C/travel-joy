import ContactIcon from "../components/img/ContactIcon.svg"
import FormInput from "../components/FormInput";

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
                            <div className="col-md-6 ">
                                <FormInput content="First name" type="text" name="firstname" />
                            </div>
                            <div className="col-md-6 ">
                                <FormInput content="Last name" type="text" name="lastname" />
                            </div>
                        </div>

                        <FormInput content="Phone Number" type="tel"  name="phonenumber"/>
                        <FormInput content="Email" type="email" name="email" />

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