import {
    createBrowserRouter,
    createRoutesFromElements,
    Route

} from "react-router-dom";
import Menu from "../pages/Menu/Menu";
import Welcome from "../pages/Welcome/Welcome";



const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Welcome />} />
            <Route path="/food" element={<Menu />} />
            <Route path="/bar" element={<Menu />} />
            <Route path="/sweet" element={<Menu />} />
        </>

    )
);


export default router