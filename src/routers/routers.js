import {
    createBrowserRouter,
    createRoutesFromElements,
    Route

} from "react-router-dom";
import Welcome from "../pages/Welcome/Welcome";
import Menu from "../pages/Menu/Menu";
// import Food from "../pages/Menu/food/Food";

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