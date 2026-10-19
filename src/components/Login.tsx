import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Login = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async () => {
        const url = BASE_URL+'/login';
        const res = await axios.post(url, {
            email: emailId,
            password
        }, {
            withCredentials: true
        });
        console.log('res', res);
    }

    return (
        <div className="flex justify-center my-4">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-lg border p-4">
                <legend className="fieldset-legend"></legend>

                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" value={emailId} onChange={(e) => setEmailId(e.target.value)} />

                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button className="btn btn-sm btn-neutral w-xs  mt-4" onClick={handleLogin}>Login</button>
            </fieldset>
        </div>
    )
}
export default Login;