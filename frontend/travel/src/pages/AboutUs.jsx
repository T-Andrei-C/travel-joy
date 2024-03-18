import RomaniaMap from "../components/img/RomaniaMap.svg"
import LocationIcon from "../components/img/LocationIcon.svg"
import TouristIcon from "../components/img/TouristIcon.svg"
import AgencyIcon from "../components/img/AgencyIcon.svg"
import TravelJoyLogoGreen from "../components/img/TravelJoyLogoGreen.svg"
import AboutUsIcon from "../components/AboutUsIcon";


const AboutUs = () => {
    return (
        <div>
            <div className="card text-bg-dark border border-0 rounded-0">
                <img
                    src="https://cdn.discordapp.com/attachments/1151791153004413009/1171739249431810098/adrian-ciocalau-_ncI1_aXwK0-unsplash.jpg?ex=6603e336&is=65f16e36&hm=b343a32bd973a3be13adf2fa9813844df07b846435edabd767f16f254d34a539&"
                    className="card-img rounded-0 h-25" alt="..."/>
                <div
                    className="card-img-overlay d-flex flex-column justify-content-center align-items-center text-center">
                    <h1 className="card-title my-auto" style={{fontFamily: "Dancing Script", fontSize: "3.5vw"}}>
                        <span className="p-2 ps-3 pe-3 rounded" style={{backgroundColor: "rgba(0, 0, 0, 0.3)"}}>TravelJoy Romania</span>
                    </h1>
                </div>
            </div>
            <div className=" d-flex flex-column justify-content-center align-items-center text-center ms-lg-5 me-lg-5">
                <h4 className="mt-3"><strong>We are</strong></h4>
                <img src={TravelJoyLogoGreen} style={{width: "30vh"}}/>
                <h5 className="mt-3"><strong>Discover Romania, Closer to Your Heart!</strong></h5>
                <div className="ms-lg-5 me-lg-5 ms-2 me-2">
                    <p className="mt-3"><strong>TravelJoy</strong> is your trusted partner for exploring the hidden
                        beauties of <strong>Romania</strong>. We passionately believe in the richness of this country,
                        with its stunning landscapes, authentic traditions, and undiscovered places waiting to be
                        explored.</p>
                    <p className="mt-3">We are dedicated to the mission of promoting tourism
                        in <strong>Romania</strong> and providing unique experiences to our travelers.
                        At <strong>TravelJoy</strong>, we take pride in our diverse range of tour packages, carefully
                        designed to connect you with the authenticity of our country. We are here to turn your journeys
                        into true adventures, creating unforgettable memories.</p>
                    <p className="mt-3"><strong>TravelJoy</strong> is a tourism company with deep roots
                        in <strong>Romania</strong> and is part of our family. With a passion for exploring and
                        discovering <strong>Romania</strong>, we aim to offer you authentic experiences to bring you
                        closer to the culture, history, and beauty of this country.</p>
                    <p className="mt-3">As staunch supporters of local tourism, we are committed to uncovering the most
                        beautiful destinations in <strong>Romania</strong>, collaborating with local communities, and
                        introducing you to undiscovered places, far from the usual tourist hustle and bustle.</p>
                    <p className="mt-3">At <strong>TravelJoy</strong>, we will guide you in exploring unique
                        destinations, provide you with unlimited options for relaxation or business travel, and offer
                        you our passionate and knowledgeable travel consultants to assist you in organizing each
                        journey.</p>
                    <p className="mt-3">Discover <strong>Romania</strong> with <strong>TravelJoy</strong> - where
                        adventure, beauty, and authenticity come together to provide you with unforgettable experiences!
                    </p>
                </div>
            </div>
            <div className="col-12 row p-0 m-0">
                <AboutUsIcon src={RomaniaMap} content="Over 5 years of experience in tourism" />
                <AboutUsIcon src={LocationIcon} content="We operate in over 300 cities in Romania" />
                <AboutUsIcon src={TouristIcon} content="Over 50k tourist annual" />
                <AboutUsIcon src={AgencyIcon} content="10 agencies of tourism" />
            </div>
        </div>
    );
}
export default AboutUs