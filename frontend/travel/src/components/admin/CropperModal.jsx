import Cropper from "react-easy-crop";

const CropperModal = ({closeCrop, imageUrl, cropImage, crop, zoom, rotation, setZoom, setRotation, setCrop, cropComplete}) => {
    return (
        <>
            <span className="w-100 h-100 position-absolute bg-black top-0 start-0 z-2 opacity-50"></span>
            <dialog className="z-3 position-absolute bg-transparent border-0 col-xl-8 col-lg-10 col-md-12 col-sm-12 col-12"
                    style={{top: "5em"}} open>
                <div className="bg-white border-success border rounded border-1 p-2">
                    <div className="d-flex justify-content-end mb-2">
                        <button type="button" onClick={() => closeCrop()} className="btn-close"
                                aria-label="Close"></button>
                    </div>
                    <div className="bg-black bg-opacity-25 position-relative col-12" style={{height: "30rem"}}>
                        <Cropper
                            image={imageUrl}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            aspect={1.6}
                            onZoomChange={setZoom}
                            onRotationChange={setRotation}
                            onCropChange={setCrop}
                            onCropComplete={cropComplete}
                        />
                    </div>
                    <div className="d-flex justify-content-between mt-1">
                        <h5 className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-6 pt-1">Zoom {(zoom * 100).toFixed()}%</h5>
                        <input
                            type="range"
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            onChange={(e) => {
                                setZoom(e.target.value)
                            }}
                            className="col-xl-9 col-lg-9 col-md-9 col-sm-8 col-6 bg-danger"
                        />
                    </div>
                    <div className="d-flex justify-content-between">
                        <h5 className="col-xl-3 col-lg-3 col-md-3 col-sm-4 col-7 pt-1">Rotation {rotation}&deg;</h5>
                        <input
                            type="range"
                            value={rotation}
                            min={0}
                            max={360}
                            onChange={(e) => {
                                setRotation(e.target.value)
                            }}
                            className="col-xl-9 col-lg-9 col-md-9 col-sm-8 col-5"
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button onClick={cropImage} type="button" className="btn btn-success">Crop</button>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default CropperModal;