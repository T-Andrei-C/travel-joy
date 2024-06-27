import HomeInput from "../components/HomeInput";
import {useEffect, useState} from "react";
import {getAllCarouselImages, getImageForCarousel} from "../service/CRUDCarouselImages";
import {FaArrowRight} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {ITEMS_PER_PAGE} from "../service/API";

const Home = () => {

    const [carouselImages, setCarouselImages] = useState([]);
    const [current, setCurrent] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getCarouselImages = async () => {
        await setLoading(false);
        const images = await getAllCarouselImages();
        const imagesUrl = [];
        for await (const image of images) {
            imagesUrl.push({city: image.city, url: getImageForCarousel(image.id)});
        }

        await setCarouselImages(imagesUrl);
    }

    useEffect(() => {

        const callFunction = async () => {
            await getCarouselImages();
            await setLoading(true);
        }
        callFunction();

    }, [])

    useEffect(() => {
        setTimeout(() => {
            current === carouselImages.length - 1 ? setCurrent(0) : setCurrent(current + 1);
        }, 5000)
    })

    return (
        <div>
            <div>
                {
                    carouselImages && carouselImages.map((image, i) => (
                        <div className={`${i === current ? "carousel_card carousel_active" : "carousel_card"}`}>
                            <img className="w-100 h-100 img-fluid object-fit-cover position-absolute" src={image.url}
                                 alt="carousel-image"/>
                            <span className="w-100 h-100 bg-black opacity-50 position-absolute"></span>
                            <div className="position-absolute d-flex justify-content-end w-100 pe-2">
                                {
                                    image.city && <button
                                        className="text-white btn bg-transparent border-0 fs-4 text-decoration-underline"
                                        onClick={() => navigate(`accommodations/${image.city.name}/${ITEMS_PER_PAGE}/0`)}>{image.city.name}
                                        <FaArrowRight className="fs-4 ms-1"/></button>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="position-absolute card-img-overlay" style={{top: "43%"}}>
                <div className="message mx-2" style={{fontFamily: 'Dancing Script'}}>
                    <h1 className="text-center text-white" style={{fontSize: "3em"}}>
                        Explore the unknown places of
                        <big> Romania</big>
                    </h1>
                </div>
                <div className="d-flex justify-content-center">
                    <HomeInput/>
                </div>
            </div>
        </div>
    )
}


export default Home;