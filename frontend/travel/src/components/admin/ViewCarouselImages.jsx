import {useEffect, useState} from "react";
import {FaPlus} from "react-icons/fa";
import {handleAccommodationImage} from "../../service/ImageService";
import ImageCropper from "./ImageCropper";
import Alert from "../Alert";
import {getCities} from "../../service/CRUDCity";
import {IoIosSave} from "react-icons/io";
import {addCarouselImage, addImageForCarousel, getAllCarouselImages} from "../../service/CRUDCarouselImages";
import CarouselImageCard from "./CarouselImageCard";

const ViewCarouselImages = () => {

    const [carouselImages, setCarouselImages] = useState(null);
    const [cities, setCities] = useState(null);
    const [isAdded, setIsAdded] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [openCrop, setOpenCrop] = useState(false);
    const [alert, setAlert] = useState([]);

    useEffect(() => {
        getAllCarouselImages().then(carouselImages => {
            setCarouselImages(carouselImages);
        })
        getCities().then(cities => {
            setCities(cities);
        })
    }, [isAdded, isDeleted])

    const uploadCarouselImage = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const city = formData.get("city") === "0" ? null : {id: formData.get("city")};

        if (file === null) {
            setAlert([...alert, {
                content: "photo missing for the accommodation",
                type: "danger"
            }]);
            return;
        }

        if (file.type === "image/png" || file.type === "image/jpeg") {
            addCarouselImage(city).then(carouselImageResponse => {
                const imageFile = new FormData();
                imageFile.append("file", file);

                if (carouselImageResponse.object !== null) {
                    addImageForCarousel(carouselImageResponse.object.id, imageFile).then(response => {
                        setAlert([...alert, response, carouselImageResponse]);
                        setIsAdded(false);
                        setFile(null);
                        setImageUrl(null);
                    })
                }
            })
        }
    }

    return (
        <>
            {
                isAdded ?
                    <form onSubmit={uploadCarouselImage}>
                        <div className="d-flex justify-content-center mb-4 mx-auto">
                            <div className="col-xl-4 col-lg-5 col-md-6 col-sm-8 col-12">
                                {
                                    imageUrl && <img src={imageUrl} className="img-fluid col-12 mb-2" alt=""/>
                                }
                                <div className="d-flex justify-content-between">
                                    <div className="col-10">
                                        <input className="btn btn-success col-12 p-1 rounded-end-0 rounded-bottom-0"
                                               style={{padding: "0.85em"}} type="file" accept=".png, .jpg"
                                               onChange={(e) => handleAccommodationImage(e, setAlert, setFile, setImageUrl, setOpenCrop)}
                                        />
                                        <select
                                            className="border border-1 border-success text-success col-12 rounded p-2 rounded-end-0 rounded-top-0"
                                            name="city">
                                            <option selected hidden value="0">Select a city</option>
                                            {
                                                cities && cities?.map(city => (
                                                    <option value={city.id}>{city.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <button
                                        className="btn btn-success col-2 fs-3 rounded-start-0"
                                        type="submit"><IoIosSave className="mb-1"/></button>
                                </div>
                            </div>
                        </div>
                    </form>
                    :
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-success mb-3" onClick={() => setIsAdded(true)}><FaPlus
                            className="mb-1"/></button>
                    </div>
            }
            <div className="row row-cols-xl-3 row-cols-lg-3 row-cols-md-2">
                {
                    carouselImages && carouselImages.map(carouselImage => (

                        <CarouselImageCard carouselImage={carouselImage} cities={cities} setAlert={setAlert} setIsDeleted={setIsDeleted}/>

                    ))
                }
            </div>
            {
                openCrop &&
                <ImageCropper setOpenCrop={setOpenCrop} photoUrl={imageUrl} setFile={setFile}
                              setPhotoUrl={setImageUrl}/>
            }
            <Alert alertData={alert} alertCallBack={setAlert}/>
        </>
    )
}

export default ViewCarouselImages;
