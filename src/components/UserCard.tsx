import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { filterFeed } from "../store/feedSlice";
import type { User } from "../modals/common";

interface UserCardProps {
    user: Partial<User>;
    isEnableRequestSendBtn?: boolean;
    emitToastMessage?: (message: string) => void;
}
const UserCard = ({
    user,
    isEnableRequestSendBtn = false,
    emitToastMessage,
}: UserCardProps) => {
    const { _id: id, firstName, lastName, about, age, gender, photoUrl } = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status: string, userId: string | undefined) => {
        try {
            const reqResponse = await axios.post(BASE_URL + `/request/send/${status}/${userId}`,
                {},
                { withCredentials: true });
            if (reqResponse.status === 200) {
                dispatch(filterFeed(userId));
                emitToastMessage?.(reqResponse?.data?.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="card bg-base-300 w-80 shadow-sm">
                <figure className="py-2">
                    <img
                        className="w-40 h-40 rounded-2xl"
                        src={photoUrl}
                        alt="Profile Pic" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    <h4 className="card-title">{about}</h4>
                    {age && gender && (<p>{age + " ," + gender}</p>)}
                    {isEnableRequestSendBtn && (
                        <div className="card-actions justify-end">
                            <button className="btn btn-secondary" onClick={() => handleSendRequest("ignored", id)}>Ignore</button>
                            <button className="btn btn-primary" onClick={() => handleSendRequest("interested", id)}>Interested</button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default UserCard;