const verifyFile = (e, alertDataCallback) => {
    const file = e.target.files[0];
    if (file !== undefined) {
        if (file.type !== "image/png" && file.type !== "image/jpeg") {
            e.target.value = "";
            alertDataCallback(current => [...current, {
                content: "file type has to be .png or .jpeg",
                type: "warning"
            }])
        } else {
            if (file.size > 10485760) {
                e.target.value = "";
                alertDataCallback(current => [...current, {
                    content: "file size is way too big",
                    type: "warning"
                }])
            } else {
                return file;
            }
        }
    }
}

export const handleAccommodationImage = (e, alertDataCallback, setFile, setImageUrl, setOpenCrop) => {
    const file = verifyFile(e, alertDataCallback);
    if (file) {
        setFile(file);
        setImageUrl(URL.createObjectURL(file))
        setOpenCrop(true);
    }
    e.target.value = "";
}

export const handleRoomImages = (e, i, alertDataCallback, images, setImages, setCurrentImage, setOpenCrop) => {
    const file = verifyFile(e, alertDataCallback);
    if (file) {
        const image = images.filter(img => img.index === i);

        if (image.length !== 0) {
            const imagesCopy = [...images].filter(img => img.index !== i);
            const newImage = {
                index: i,
                file: file,
                imageUrl: URL.createObjectURL(file)
            }
            imagesCopy.push(newImage)
            setImages(imagesCopy);
            setCurrentImage(newImage);
            setOpenCrop(true);
        } else {
            const newImage = {
                index: i,
                file: file,
                imageUrl: URL.createObjectURL(file)
            }
            setImages([...images, newImage]);
            setCurrentImage(newImage);
            setOpenCrop(true);
        }
    }
    e.target.value = "";
}