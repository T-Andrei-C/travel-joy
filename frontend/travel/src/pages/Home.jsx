import homeImage from "../components/img/homeImage.jpg";
import Input from "../components/home-page/Input"


const Home = () => {
    return(
        <div className="text-bg-dark" id="blur">
            <img src={homeImage} className="card-img img-fluid position-absolute object-fit-cover z-n1 w-100 h-100" alt="..."/>
            <div className="card-img-overlay">
                <div className="message">
                    <h1 className="text-center text-white" id="description-txt">
                        Explore the unknown places of
                        <big id="romania"> Romania</big>
                    </h1>
                </div>
                <Input/>
            </div>
        </div>
    );
}


export default Home;