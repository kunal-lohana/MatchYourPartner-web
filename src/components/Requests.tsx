import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addRequests, removeRequests } from "../store/requestSlice";
const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector(store => store.requests);
    const [error, setError] = useState("");

    const getRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/receivers", { withCredentials: true });
            if (res.status === 200) {
                console.log('res', res.data.data);
                dispatch(addRequests(res.data.data));
            }
        } catch (error) {
            setError(error?.response?.data);
        }
    }

    const handleRequest = async (status: string, _id: string) => {
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
    if (requests?.length === 0) return (<h2 className="text-center text-shadow-warning text-2xl py-5">No requests exists!!</h2>)

    return (<div className="flex flex-col items-center gap-5 my-5 text-center mx-auto w-full">
        {requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } = request?.fromUserId;
            return (
                <div 
                    key={_id} 
                    className="w-full max-w-5xl flex items-center bg-base-300 gap-10 p-2 shadow-sm">
                    <img alt="photo" src={photoUrl} className="w-20 h-20 rounded-full"></img>
                    <div className="text-left mx-4">
                        <h3 className="text-xl font-bold">{firstName + " " + lastName}</h3>
                        <p className="flex-nowrap">{about}</p>
                        {age && gender && <p>{age + " ," + gender}</p>}
                    </div>
                    <div className="flex justify-end-self gap-5">
                        <button className="btn btn-primary" onClick={() => handleRequest('rejected', request?._id)}>Reject</button>
                        <button className="btn btn-secondary" onClick={() => handleRequest('accepted', request?._id)}>Accept</button>
                    </div>
                </div>
            )
        })}
    </div>)
}
export default Requests;
