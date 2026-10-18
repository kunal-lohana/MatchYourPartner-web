import { Outlet } from "react-router";
import Footer from "./Footer";
import NavBar from "./NavBar";

const Body = () => {
    return (
        <>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    )
}
export default Body;