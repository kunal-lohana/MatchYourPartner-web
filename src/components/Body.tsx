import { Outlet, useNavigate } from "react-router";
import Footer from "./Footer";
import NavBar from "./NavBar";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import type { RootState } from "../store/appStore";

const Body = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((store: RootState) => store.user);
    const fetchUser = async () => {
        if (!userData) {
            try {
                const res = await axios.get(BASE_URL + "/profile/view", {
                    withCredentials: true
                });
                if (res.status === 200) {
                    dispatch(addUser(res.data.data));
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error?.status === 401) {
                        return navigate("/login");
                    }
                } else {
                    console.error("Unexpected error:", error);
                }
            }
        }
    }

    useEffect(() => {
        fetchUser()
    }, []);

    return (
        <>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    )
}
export default Body;