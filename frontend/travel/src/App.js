import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js"
import Home from "./pages/Home";
import Accommodations from "./pages/Accommodations"
import Package from "./pages/Package";
import AboutUs from "./pages/AboutUs";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="/accommodations/:itemsPerPage/:numberOfPage" element={<Accommodations/>}/>
            <Route path="/accommodations/:destination/:itemsPerPage/:numberOfPage" element={<Accommodations/>}/>
            <Route path="/accommodations/:destination/:itemsPerPage/:numberOfPage/:checkIn/:checkOut/:numberOfPersons" element={<Accommodations/>}/>
            <Route path="/packages/3/1" element={<Package/>} />
            <Route path="/packages/:destination/3/1" element={<Package/>}/>
            <Route path="/packages/:destination/3/1/:checkIn/:checkOut/:numberOfPersons" element={<Package/>}/>
            <Route path="/aboutus" element={<AboutUs/>} />
            <Route path="/login" element={<LogIn/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/contact" element={<Contact/>} />
        </Route>
    )
)

export default function App() {
    return <RouterProvider router={router}/>
}

