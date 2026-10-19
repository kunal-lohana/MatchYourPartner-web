import { useSelector } from "react-redux";
import { Link } from "react-router";
const NavBar = () => {

    const user = useSelector(store => store.user);
    return (
        <>
            <div className="navbar bg-base-200 shadow-sm px-4">
                <div className="flex-1">
                    <Link to="/" className="btn btn-ghost text-xl">Match Your Partner</Link>
                </div>
                <div className="flex gap-2">
                    {user && (
                    <><div className="navbar-center hidden lg:flex font-bold">Welcome, {user.firstName}</div><div className="dropdown dropdown-end">
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
                                <li><a>Link</a></li>
                                <li>
                                    <Link to="/profile" className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a>Logout</a></li>
                            </ul>
                        </div></>)}
                </div>
            </div>
        </>
    )
}

export default NavBar;