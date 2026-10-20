import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addConnections } from "../store/connectionSlice";

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector(store => store.connections);
    const [error, setError] = useState("");
    const getConnections = async () => {
        if(connections) return;
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            if (res.status === 200) {
                dispatch(addConnections(res.data.data));
            }
        } catch (error) {
            setError(error?.response?.data);
        }

    }
    useEffect(() => {
        getConnections();
    }, []);
    if (!connections) return;
    if (connections?.length === 0) return (<h2 className="text-center text-shadow-warning text-2xl py-5">No Connections exists!!</h2>)

    return (<div className="flex flex-col items-center gap-5 max-w-2/3 my-5 text-center mx-auto">
        {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
            return (
                <div key={_id} className="flex justify-center bg-base-300 gap-10 p-2 shadow-sm items-center">
                    <img alt="photo" src={photoUrl} className="w-20 h-20 rounded-full"></img>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-bold">{firstName + " " + lastName}</h3>
                        <p className="flex-nowrap">{about}</p>
                        {age && gender && <p>{age + " ," + gender}</p>}
                    </div>
                </div>
            )
        })}
    </div>)
}
export default Connections;