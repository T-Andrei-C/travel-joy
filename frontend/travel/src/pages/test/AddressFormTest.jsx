import FormInput from "../../components/FormInput";

const AddressFormTest = ({data}) => {
    return(
        <div className="card-body p-lg-3 p-xl-3 p-md-3 text-center">
            <h3 className="mb-4">Billing Data</h3>
            <div className="row">
                <div className="col-md-6">
                    <FormInput content="First name" type="text" name="firstname" defaultValue={data.firstname}/>
                </div>
                <div className="col-md-6">
                    <FormInput content="Last name" type="text" name="lastname" defaultValue={data.lastname}/>
                </div>
            </div>

            <FormInput content="Email" type="email" name="email" defaultValue={data.email}/>
            <FormInput content="Phone Number" type="number" name="phoneNumber" defaultValue={data.phoneNumber}/>
            <FormInput content="Country" type="text" name="country" defaultValue={data.country}/>
            <div className="row">
                <div className="col-md-6">
                    <FormInput content="City" type="text" name="city" defaultValue={data.city}/>
                </div>
                <div className="col-md-6">
                    <FormInput content="County" type="text" name="county" defaultValue={data.county}/>
                </div>
            </div>
        </div>
    );
}
export default AddressFormTest