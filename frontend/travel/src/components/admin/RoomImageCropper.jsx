import Cropper from "react-easy-crop";
import {useState} from "react";
import getCroppedImg from "../../service/cropImage";
import CropperModal from "./CropperModal";

const RoomImageCropper = ({setOpenCrop, setImage, image, setImages, images}) => {

    const [crop, setCrop] = useState({x: 0, y: 0});
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }

    const cropImage = () => {
        try {
            getCroppedImg(image.imageUrl, croppedAreaPixels, rotation).then(response => {
                image.file = response.file;
                image.imageUrl = response.url;
                const imagesCopy = [...images].filter(img => img.index !== image.index);
                imagesCopy.push(image);
                setImages(imagesCopy);
                setOpenCrop(false);
            })
        } catch (error) {
        }
    }

    const closeCrop = () => {
        const imagesCopy = [...images];
        imagesCopy.splice(imagesCopy.length - 1, 1);

        setImages(imagesCopy);
        setImage(null);
        setOpenCrop(false);
    }

    return (
        <CropperModal
            cropComplete={cropComplete}
            closeCrop={closeCrop}
            cropImage={cropImage}
            imageUrl={image.imageUrl}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            setCrop={setCrop}
            setZoom={setZoom}
            setRotation={setRotation}
        />
    )
}

export default RoomImageCropper;