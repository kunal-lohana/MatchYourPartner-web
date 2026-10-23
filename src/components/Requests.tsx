import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addRequests, removeRequests } from "../store/requestSlice";
import type { RootState } from "../store/appStore";

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store: RootState) => store.requests);
    const [error, setError] = useState("");

    const getRequests = async () => {
        setError('Loading...');
        try {
            const res = await axios.get(BASE_URL + "/user/receivers", { withCredentials: true });
            if (res.status === 200) {
                if (res?.data?.data?.length === 0) {
                    setError('No Request exists...');
                }
                dispatch(addRequests(res.data.data));
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error?.response?.data) {
                    setError(error.response?.data || 'something went wrong!!');
                }
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }

    const handleRequest = async (status: string, _id: string | undefined) => {
        try {
            const requestId = _id;
            if (requestId) {
                const reqResponse = await axios.post(BASE_URL + `/request/review/${status}/${requestId}`,
                    {},
                    { withCredentials: true });
                if (reqResponse.status === 200) {
                    dispatch(removeRequests(requestId));
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getRequests();
    }, []);

    if (!requests) return;
    if (requests?.length === 0) return (<h2 className="text-center text-shadow-warning text-2xl py-5">{error}</h2>)

    return (<div className="flex flex-col items-center gap-5 my-5 text-center mx-auto px-2 w-full">
        {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } = request?.fromUserId;
            return (
                <div
                    key={_id}
                    className="flex flex-col sm:flex-row items-center bg-base-300 gap-4 sm:gap-10 p-4 shadow-sm w-full max-w-5xl"
                >
                    <img alt="photo" src={photoUrl} className="w-20 h-20 rounded-full"></img>
                    <div className="text-left mx-2 sm:mx-4 min-w-0 flex-1 w-full">
                        <h3 className="text-xl font-bold wrap-break-word">
                            {firstName + " " + lastName}
                        </h3>

                        <p className="wrap-break-word overflow-wrap-anywhere">
                            {about}
                        </p>

                        {age && gender && (
                            <p>{age + " ," + gender}</p>
                        )}
                    </div>
                    <div className="flex justify-center sm:justify-end gap-3 sm:gap-5 shrink-0 w-full sm:w-auto">
                        <button className="btn btn-primary" onClick={() => handleRequest('rejected', request?._id)}>Reject</button>
                        <button className="btn btn-secondary" onClick={() => handleRequest('accepted', request?._id)}>Accept</button>
                    </div>
                </div>
            )
        })}
    </div>)
}
export default Requests;
