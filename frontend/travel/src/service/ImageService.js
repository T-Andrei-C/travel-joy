export const verifyFile = (e, alertDataCallback) => {
    const file = e.target.files[0];
    if (file !== undefined){
        if (file.type !== "image/png" && file.type !== "image/jpeg") {
            e.target.value = "";
            alertDataCallback(current => [...current, {
                content: "file type has to be .png or .jpeg",
                type: "warning"
            }])
        } else {
            if (file.size > 10485760){
                e.target.value = "";
                alertDataCallback(current => [...current, {
                    content: "file size is way too big",
                    type: "warning"
                }])
            }
        }
    }
}

export const retrieveRoomImageFiles = (formData) => {
    const images = [];
    for (let i = 0; i < 6; i++) {
        if (formData.get(`file-${i}`).type === "image/png" || formData.get(`file-${i}`).type === "image/jpeg") {
            const image = {
                index: i,
                file: formData.get(`file-${i}`)
            }
            images.push(image);
        }
    }
    return images;
}