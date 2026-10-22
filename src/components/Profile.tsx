import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import type { RootState } from "../store/appStore";

const Profile = () => {
    const userData = useSelector((store: RootState) => store.user);
    return (
        userData && <EditProfile user={userData}></EditProfile>
    )
}
export default Profile;