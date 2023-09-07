import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout/>}>
            <Route index element={<Home/>}/>
        </Route>
    )
)

export default function App() {
    return <RouterProvider router={router}/>
}

