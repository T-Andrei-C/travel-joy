import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js"
import Home from "./pages/Home";
import Accommodations from "./pages/Accommodations"


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="/accommodations" element={<Accommodations/>}/>
            <Route path="/accommodations/:destination" element={<Accommodations/>}/>
        </Route>
    )
)

export default function App() {
    return <RouterProvider router={router}/>
}

