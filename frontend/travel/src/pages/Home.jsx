import homeImage from "../components/img/homeImage.jpg";
import HomeInput from "../components/HomeInput"


const Home = () => {
    return(
        <div className="text-bg-dark" id="blur">
            <img src="https://cdn.discordapp.com/attachments/1151791153004413009/1171746366070997054/sokol-eugeniu-LD5-9Qr6uqc-unsplash.jpg?ex=655dccd7&is=654b57d7&hm=ced99cd99458e5da72c756268229734472fe99d7f52ebb434689952018e80d6f&" className="card-img img-fluid position-absolute object-fit-cover z-n1 w-100 h-100" alt="..."/>
            <div className="card-img-overlay mt-5">
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