import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
    const dispatch = useDispatch();
    const usersFeed = useSelector(store => store.feed);
    const [error, setError] = useState("");
    const getFeed = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
            if (res.status === 200) {
                dispatch(addFeed(res.data.data));
            }
        } catch (error) {
            setError(error?.response?.data);
        }
    }

    useEffect(() => {
        getFeed();
    }, []);

    return (
        <div className="flex flex-col items-center my-5 gap-10">
            {usersFeed?.length > 0 ? (
                usersFeed.map((data) => (
                    <UserCard key={data._id} user={data} />
                ))
            ) : (
                <div className="inline-grid *:[grid-area:1/1]">
                    <div className="status status-error animate-ping"></div>
                    <div className="status status-error"></div>

                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}
export default Feed;