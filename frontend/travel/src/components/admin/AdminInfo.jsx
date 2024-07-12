import {FaEdit, FaPlus} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {useState} from "react";
import Alert from "../Alert";

const AdminInfo = () => {

    const [alert, setAlert] = useState([]);
    const alerts = [
        {content: "This is a warning alert", type: "warning"},
        {content: "This is a success alert", type: "success"},
        {content: "This is a danger alert", type: "danger"}
    ];

    console.log(alerts[Math.floor(Math.random() * alerts.length)])

    return (
        <div>
            <div className="text-center">
                <h1>Welcome to Travel Joy</h1>
                <h2 className="text-success">Admin Panel</h2>
            </div>
            <div className="h-100 w-100">
                <hr className="border border-3 border-success rounded"/>
            </div>
            <div className="text-center mb-3">
                <h4>Frequently used buttons</h4>
            </div>
            <div className="bg-warning-subtle col-12 p-2 rounded rounded-bottom-0">
                <div className="form-check form-switch d-flex justify-content-center">
                    <input className="form-check-input" id="checkBoxInput" type="checkbox" role="switch"/>
                </div>
                <div className="col-12">
                    <h5>- Checkbox input is used for disabling and enabling;</h5>
                    <h5>- You can disable <strong>Accommodations</strong> and <strong>Rooms</strong>;</h5>
                    <h5>- Once you disable an <strong>Accommodation</strong>, all the <strong>Rooms</strong> within
                        that <strong>Accommodation</strong> will also be disabled and all the <strong>Room
                            Offers</strong> within those <strong>Rooms</strong> that haven't been yet bought will be
                        permanently deleted;</h5>
                    <h5>- The <strong>Room Offers</strong> in a <strong>Room</strong> will also be deleted if you
                        disable that <strong>Room</strong>;</h5>
                    <h5>- You can only add <strong>Rooms</strong> to an <strong>Accommodation</strong> if
                        that <strong>Accommodation</strong> is enabled; The same thing applies to <strong>Room
                            Offers</strong>, where you need to have the <strong>Room</strong> enabled in order to add
                        a <strong>Room Offer</strong>.</h5>
                </div>
            </div>
            <div className="bg-info-subtle col-12 p-2 ">
                <div className="d-flex justify-content-center">
                    <button className="bg-transparent border-0 mb-0 fs-3" type="button"><MdDelete className="mb-1"/>
                    </button>
                </div>
                <div className="col-12">
                    <h5>- The Delete Button is used for permanently deleting objects from the database;</h5>
                    <h5>- Clicking the button will will delete items on the spot;</h5>
                    <h5>- If a <strong>Room Offer</strong> has been bought, it can't be deleted anymore;</h5>
                    <h5>- An object can't be deleted if is in use by another object;</h5>
                </div>
            </div>
            <div className="bg-success-subtle col-12 p-2 ">
                <div className="d-flex justify-content-center">
                    <button className="bg-transparent border-0 mb-0"><FaEdit className="fs-4"/></button>
                </div>
                <div className="col-12">
                    <h5>- The Edit Button is used for updating objects from the database;</h5>
                    <h5>- Clicking the button will always redirect you to another page;</h5>
                    <h5>- <strong>Room Offers</strong> are not editable;</h5>
                </div>
            </div>
            <div className="bg-danger-subtle col-12 p-2 rounded rounded-top-0">
                <div className="d-flex justify-content-center">
                    <button type="button" className="btn-success btn btn-sm m-1 h-25"><FaPlus/></button>
                </div>
                <div className="col-12">
                    <h5>- The Plus Button is used for adding objects to the database;</h5>
                    <h5>- Clicking the button in some cases will redirect you to another page, or the button will
                        transform into a simple {'<form/>'} directly into that page;</h5>
                </div>
            </div>
            <div className="h-100 w-100">
                <hr className="border border-3 border-success rounded"/>
            </div>
            <div className="text-center mb-3">
                <h4>Alerts</h4>
            </div>
            <div className="bg-secondary-subtle col-12 p-2 rounded rounded-top-0">
                <div className="d-flex justify-content-center">
                    <button onClick={() => setAlert([...alert, alerts[Math.floor(Math.random() * alerts.length)]])}
                            type="button" className="btn-success btn btn-sm m-1 h-25">Show Alert
                    </button>
                </div>
                <div className="col-12">
                    <h5>- Alerts are used for informing the admin;</h5>
                    <h5>- There are 3 different types of alerts: <strong className="text-warning">warning</strong>, <strong className="text-danger">danger</strong> and <strong className="text-success">success</strong>;</h5>
                    <h5>- Alerts will also disappear after a few seconds;</h5>
                </div>
            </div>
            <Alert alertData={alert} alertCallBack={setAlert}/>
        </div>
    )
}

export default AdminInfo;