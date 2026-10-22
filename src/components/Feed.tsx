import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import UserCard from "./UserCard";
import type { RootState } from "../store/appStore";

const Feed = () => {
    const dispatch = useDispatch();
    const usersFeed = useSelector((store: RootState) => store.feed);
    const [error, setError] = useState("");
    const [toast, setToast] = useState("");
    const getFeed = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true });
            if (res.status === 200) {
                dispatch(addFeed(res.data.data));
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error?.response?.data) {
                    setError(error?.response?.data || 'something went wrong!!');
                }
            } else {
                console.error("Unexpected error:", error);
            }
        }
    };
    
    const handleShowToast = (msg: string) => {
        setToast(msg);
        setTimeout(() => {
            setToast("");
        }, 3000);
    }

    useEffect(() => {
        getFeed();
    }, []);

    return (
        <div className="flex flex-col items-center my-5 gap-10">
            {usersFeed?.length > 0 ? (
                usersFeed.map((data) => (
                    <UserCard
                        key={data._id}
                        user={data}
                        isEnableRequestSendBtn={true}
                        emitToastMessage={handleShowToast}
                    />
                ))
            ) : (
                <>
                <div className="inline-grid *:[grid-area:1/1]">
                    <div className="status status-error animate-ping"></div>
                    <div className="status status-error"></div>
                </div>
                    <h3 className="text-2xl text-shadow-error">{error || 'No more users avaiable!!'}</h3>
                </>
            )}
            {toast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>{toast}</span>
                </div>
            </div>}
        </div>
    );
}
export default Feed;