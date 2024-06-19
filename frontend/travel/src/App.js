import {createBrowserRouter, Route, createRoutesFromElements, RouterProvider} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import Home from "./pages/Home";
import Accommodations from "./pages/Accommodations"
import Package from "./pages/Package";
import AboutUs from "./pages/AboutUs";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";
import ViewDetails from "./pages/ViewDetails";
import MyAccount from "./pages/MyAccount";
import ForgotPassword from "./pages/ForgotPassword";
import Checkout from "./pages/checkout/Checkout";
import Error from "./pages/Error";
import MyOrders from "./pages/MyOrders";
import RatingReservation from "./components/RatingReservation";
import AdminPanel from "./pages/AdminPanel";
import ViewHotels from "./components/admin/ViewHotels";
import EditHotel from "./components/admin/EditHotel";
import EditRoom from "./components/admin/EditRoom";
import EditRoomOffer from "./components/admin/EditRoomOffer";
import AddRoomOffer from "./components/admin/AddRoomOffer";
import AddRoom from "./components/admin/AddRoom";
import AddHotel from "./components/admin/AddHotel";
import ViewHotelFacilities from "./components/admin/ViewHotelFacilities";
import ViewRoomFacilities from "./components/admin/ViewRoomFacilities";
import ViewRoomOfferTypes from "./components/admin/ViewRoomOfferTypes";
import ViewDiscounts from "./components/admin/ViewDiscounts";
import ViewCities from "./components/admin/ViewCities";
import ViewRoomTypes from "./components/admin/ViewRoomTypes";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<RootLayout/>}>
                <Route index element={<Home/>}/>
                <Route path="/accommodations/:itemsPerPage/:numberOfPage" element={<Accommodations/>}/>
                <Route path="/accommodations/:destination/:itemsPerPage/:numberOfPage" element={<Accommodations/>}/>
                <Route
                    path="/accommodations/:destination/:checkIn/:checkOut/:numberOfPersons/:itemsPerPage/:numberOfPage"
                    element={<Accommodations/>}/>
                <Route path="/packages/:itemsPerPage/:numberOfPage" element={<Package/>}/>
                <Route path="/packages/:destination/:itemsPerPage/:numberOfPage" element={<Package/>}/>
                <Route path="/packages/:destination/:checkIn/:checkOut/:numberOfPersons/:itemsPerPage/:numberOfPage"
                       element={<Package/>}/>
                <Route path="/aboutus" element={<AboutUs/>}/>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/myaccount" element={<MyAccount/>}/>
                <Route path="/myorders" element={<MyOrders/>}/>
                <Route path="/myorders/rating/:reservationId" element={<MyOrders/>}/>
                <Route path="/forgotpassword/:uuid" element={<ForgotPassword/>}/>
                <Route path="/error" element={<Error/>}/>
                <Route path="/checkout/:city/:housingName/:room/:checkIn/:checkOut/:price" element={<Checkout/>}/>
                <Route
                    path="/accommodations/details/:accommodationName/:destination/:checkIn/:checkOut/:numberOfPersons"
                    element={<ViewDetails/>}/>
                <Route path="/:random" element={<Error/>}/>
            </Route>
            <Route path="/admin" element={<AdminPanel/>}>
                <Route path="/admin/hotels" element={<ViewHotels/>}/>
                <Route path="/admin/hotels/:id" element={<EditHotel/>}/>
                <Route path="/admin/hotels/add" element={<AddHotel/>}/>
                <Route path="/admin/hotel/facilities" element={<ViewHotelFacilities/>}/>
                <Route path="/admin/hotels/:id/room/:roomId" element={<EditRoom/>}/>
                <Route path="/admin/hotels/:id/room/add" element={<AddRoom/>}/>
                <Route path="/admin/roomTypes" element={<ViewRoomTypes/>}/>
                <Route path="/admin/room/facilities" element={<ViewRoomFacilities/>}/>
                <Route path="/admin/hotels/:id/room/:roomId/offer/:offerId" element={<EditRoomOffer/>}/>
                <Route path="/admin/hotels/:id/room/:roomId/offer/add" element={<AddRoomOffer/>}/>
                <Route path="/admin/roomOfferTypes" element={<ViewRoomOfferTypes/>}/>
                <Route path="/admin/discounts" element={<ViewDiscounts/>}/>
                <Route path="/admin/cities" element={<ViewCities/>}/>
            </Route>
        </>
    )
)

export default function App() {
    return <RouterProvider router={router}/>
}

