import {handleRoomImages} from "../../service/ImageService";
import {getRoomImage} from "../../service/CRUDRooms";

const ViewAndAddRoomImages = ({setAlert, images, setImages, setCurrentImage, setOpenCrop, roomId}) => {
    const ifImageExists = (i) => {
        return images.filter(img => img.index === i)[0] !== undefined ? images.filter(img => img.index === i)[0]?.imageUrl : getRoomImage(roomId, i);
    }

    return (
        <div className="row row-cols-xl-3 row-cols-lg-3 row-cols-md-2 row-cols-1 mb-4 mx-auto">
            {
                Array.from(Array(6).keys()).map((i) => (
                        <div className="border border-success">
                            <img src={ifImageExists(i)} className="img-fluid col-12 mt-2"
                                 alt={`room-${roomId}-image`}
                                 onError={(e) => e.target.src = "https://artsmidnorthcoast.com/wp-content/uploads/2014/05/no-image-available-icon-6.png"}/>
                            <input className="btn btn-success col-12 mt-2 mb-2" type="file" name={`file-${i}`}
                                   accept=".png, .jpg"
                                   onChange={(e) =>  handleRoomImages(e, i, setAlert, images, setImages, setCurrentImage, setOpenCrop)}/>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default ViewAndAddRoomImages;