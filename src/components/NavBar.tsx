import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../store/userSlice";
import { removeConnections } from "../store/connectionSlice";
import { removeFeed } from "../store/feedSlice";
import { deleteRequest } from "../store/requestSlice";
const NavBar = () => {
    const navigate = useNavigate();
    const user = useSelector(store => store.user);
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            const res = await axios.post(BASE_URL + "/logout", {}, {
                withCredentials: true
            })
            if(res.status === 200) {
                dispatch(removeUser());
                dispatch(removeConnections());
                dispatch(removeFeed());;
                dispatch(deleteRequest())
                return navigate("/login");
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="navbar bg-base-200 shadow-sm px-4">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-xl">Match Your Partner</Link>
                </div>
                <div className="flex gap-2">
                    {user && (
                        <><div className="navbar-center lg:flex font-bold">Welcome, {user.firstName}</div><div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="profile image"
                                        src={user.photoUrl} />
                                </div>
                            </div>
                            <ul
                                tabIndex={-1}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li>
                                    <Link to="/profile" className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><Link to="/connections">Connections</Link></li>
                                <li><Link to="/requests">Requests</Link></li>
                                <li><a onClick={handleLogout}>Logout</a></li>
                            </ul>
                        </div></>)}
                </div>
            </div>
        </>
    )
}

export default NavBar;