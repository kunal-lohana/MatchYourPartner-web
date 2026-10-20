import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
    const userData = useSelector(store => store.user);
    return (
        userData && <EditProfile user={userData}></EditProfile>
    )
}
export default Profile;