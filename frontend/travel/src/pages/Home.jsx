import HomeInput from "../components/HomeInput";
import {useEffect, useState} from "react";

const Home = () => {

    const imageClass = "card-img img-fluid position-absolute object-fit-cover z-n1 w-100 h-100 carousel-item";
    const [carouselImages, setCarouselImages] = useState();
    const [test, setTest] = useState(null);
    let index = 0;

    useEffect(() => {
        setCarouselImages(document.getElementById("carouselExampleSlidesOnly").childNodes);
    }, [])

    const showImage = (imageNumber) => {
        for (let i = 0; i < carouselImages?.length; i++) {
            if (i === imageNumber){
                carouselImages[i].classList.add("active");
                // carouselImages[i].classList.add("carousel-item-next");
                // carouselImages[i].classList.add("carousel-item-start");
                // setTimeout(() => {
                //     carouselImages[i].classList.remove("carousel-item-next");
                //     carouselImages[i].classList.remove("carousel-item-start");
                //
                // },2000);
            } else {
                carouselImages[i].classList.remove("active");
                // carouselImages[i].classList.add("carousel-item-start");
                // setTimeout(() => {
                //     carouselImages[i].classList.remove("carousel-item-start");
                // },2000);


            }
        }

        index++;

        if (index >= carouselImages?.length){
            index = 0;
        }
    }

    setInterval(() => showImage(index), 2000);

    return (
        <div className="" id="blur">
            <div id="carouselExampleSlidesOnly" className="carousel-fade slide"
                 data-bs-interval="false">
                <img
                    src="https://cdn.discordapp.com/attachments/1151791153004413009/1171746366070997054/sokol-eugeniu-LD5-9Qr6uqc-unsplash.jpg?ex=65e83a57&is=65d5c557&hm=ff6bd6168e40f46054a3ea89f209108121e69abbf3255fc0af1cc7643d1e5c67&"
                    className={imageClass + " active"} alt="..."/>
                <img
                    src="https://images.unsplash.com/photo-1692313532979-7c06e90b72de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={imageClass} alt="..."/>
                <img
                    src="https://images.unsplash.com/photo-1664912879009-fcf1fb932009?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={imageClass} alt="..."/>
                <img
                    src="https://images.unsplash.com/photo-1563446841513-b8538b29b9cb?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={imageClass} alt="..."/>
                <img
                    src="https://images.unsplash.com/photo-1669550332092-af967a36ca87?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={imageClass} alt="..."/>
                <img
                    src="https://images.unsplash.com/photo-1565017058424-77a08dcd6aff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={imageClass} alt="..."/>
                <img
                    src="https://images.unsplash.com/photo-1518887668165-8fa91a9178be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={imageClass} alt="..."/>
                <img
                    src="https://images.unsplash.com/photo-1597509475691-863488413d13?q=80&w=1900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={imageClass} alt="..."/>
                <img
                    src="https://images.unsplash.com/photo-1612728464511-475e7bd1a319?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={imageClass} alt="..."/>
                <img
                    src="https://images.unsplash.com/photo-1672700578668-8fc6559b5a29?q=80&w=1899&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={imageClass} alt="..."/>
                <img
                    src="https://images.unsplash.com/photo-1656843799293-371c4e28d19b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={imageClass} alt="..."/>
                <img
                    src="https://images.unsplash.com/photo-1682796744377-370a6585b081?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={imageClass} alt="..."/>
                <img
                    src="https://images.unsplash.com/photo-1660895870461-a836aa1a1148?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={imageClass} alt="..."/>
                <img
                    src="https://images.unsplash.com/photo-1634629684316-9123cd726d7d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={imageClass} alt="..."/>
                <img
                    src="https://images.unsplash.com/photo-1633254683551-3c39a29cbe4b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={imageClass} alt="..."/>
                <img
                    src="https://images.unsplash.com/photo-1674671304643-725d5a519148?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={imageClass} alt="..."/>
                <img
                    src="https://images.unsplash.com/photo-1674666743106-1a28a0ddfc34?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={imageClass} alt="..."/>
                <img
                    src="https://images.unsplash.com/photo-1616252852543-a7e88099909a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={imageClass} alt="..."/>
                <img
                    src="https://images.unsplash.com/photo-1621159987597-422433f5a438?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={imageClass} alt="..."/>
                <img
                    src="https://images.unsplash.com/photo-1520529986992-d4ce365fcfc9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={imageClass} alt="..."/>
                <img
                    src="https://images.unsplash.com/photo-1456491882918-2bc1929963f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className={imageClass} alt="..."/>
            </div>
            <div className="card-img-overlay h-100" style={{backgroundColor: "rgba(0, 0, 0, 0.3)", marginTop: "3.5em"}}>
                <div className="message mt-2">
                    <h1 className="text-center text-white" id="description-txt">
                        Explore the unknown places of
                        <big id="romania"> Romania</big>
                    </h1>
                </div>
                <HomeInput/>
            </div>
        </div>
    );
}


export default Home;