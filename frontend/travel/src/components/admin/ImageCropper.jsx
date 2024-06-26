import Cropper from "react-easy-crop";
import {useState} from "react";
import getCroppedImg from "../../service/cropImage";
import CropperModal from "./CropperModal";

const ImageCropper = ({photoUrl, setOpenCrop, setFile, setPhotoUrl}) => {

    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }

    const cropImage = () => {
        try {
            getCroppedImg(photoUrl, croppedAreaPixels, rotation).then(response => {
                setFile(response.file);
                setOpenCrop(false);
                setPhotoUrl(response.url);
            })
        } catch (error) {
        }
    }

    const closeCrop = () => {
        setFile(null);
        setPhotoUrl(null);
        setOpenCrop(false);
    }

    return (
        <CropperModal
            cropComplete={cropComplete}
            closeCrop={closeCrop}
            cropImage={cropImage}
            imageUrl={photoUrl}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            setCrop={setCrop}
            setZoom={setZoom}
            setRotation={setRotation}
        />
    )
}

export default ImageCropper;