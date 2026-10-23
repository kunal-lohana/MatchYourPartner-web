import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addConnections } from "../store/connectionSlice";
import { useAppSelector, useAppDispatch } from "../store/hooks";

const Connections = () => {
    const dispatch = useAppDispatch();
    const connections = useAppSelector(
    (state) => state.connections
  );
    const [error, setError] = useState("");
    const getConnections = async () => {
        setError('Loading...');
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            if (res.status === 200) {
                if(res?.data?.data?.length === 0 ) {
                    setError('No Connections exists...');
                }
                dispatch(addConnections(res.data.data));
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error?.response?.data) {
                    setError(error?.response?.data);
                }
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }
    useEffect(() => {
        getConnections();
    }, []);
    if (!connections || connections.length === 0) {
        return (<h2 className="text-center text-shadow-warning text-2xl py-5">{error}</h2>)
    }

    return (<div className="flex flex-col items-center gap-5 w-full max-w-5xl my-5 text-center mx-auto h-auto overflow-auto">
        {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } = connection;
            return (
                <div key={_id} className="w-full flex justify-start bg-base-300 gap-10 p-2 shadow-sm items-center">
                    <img alt="photo" src={photoUrl} className="w-20 h-20 rounded-full"></img>
                    <div className="flex flex-col text-left gap-2">
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