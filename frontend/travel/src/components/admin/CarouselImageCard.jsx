import {useState} from "react";
import ImageCropper from "./ImageCropper";
import Alert from "../Alert";
import {handleAccommodationImage} from "../../service/ImageService";
import {IoIosSave} from "react-icons/io";
import {
    addImageForCarousel,
    deleteCarouselImage,
    getImageForCarousel,
    updateCarouselImage
} from "../../service/CRUDCarouselImages";
import {MdDelete} from "react-icons/md";

const CarouselImageCard = ({carouselImage, cities, setIsDeleted, setAlert}) => {

    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [openCrop, setOpenCrop] = useState(false);

    const removeCarouselImage = () => {
        deleteCarouselImage(carouselImage.id).then(response => {
            setAlert(current => [...current, response]);
            setIsDeleted(true);
        })
        setIsDeleted(false);
    }

    const editCarouselImage = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const city = formData.get("city") === "0" ? null : {id: formData.get("city")};

        updateCarouselImage(carouselImage.id, city).then(carouselImageResponse => {
            if (file !== null){
                const imageFormData = new FormData();
                imageFormData.append("file", file);

                addImageForCarousel(carouselImage.id, imageFormData).then(response => {
                    setAlert(current => [...current, response, carouselImageResponse]);
                })
            } else {
                setAlert(current => [...current, carouselImageResponse]);
            }
        })
    }

    return (
        <div className="mb-3">
            <form onSubmit={editCarouselImage}>
                <div className="bg-black rounded mb-2 position-relative">
                    <img src={imageUrl ? imageUrl : getImageForCarousel(carouselImage?.id)}
                         className="img-fluid col-12 opacity-50" alt=""/>
                    <div className="card-img-overlay d-flex justify-content-end bg-danger" style={{height: "0%"}}>
                        <button
                            className="btn border-0 text-white fs-3" onClick={removeCarouselImage}
                            type="button"><MdDelete className="mb-1"/></button>
                    </div>
                </div>

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
                                    <option selected={city.id === carouselImage?.city?.id}
                                            value={city.id}>{city.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <button
                        className="btn btn-success col-2 fs-3 rounded-start-0"
                        type="submit"><IoIosSave className="mb-1"/></button>
                </div>
            </form>
            {
                openCrop &&
                <ImageCropper setOpenCrop={setOpenCrop} photoUrl={imageUrl} setFile={setFile}
                              setPhotoUrl={setImageUrl}/>
            }
        </div>
    )
}

export default CarouselImageCard;
