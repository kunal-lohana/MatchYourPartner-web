import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router";

const Login = () => {
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoginForm, setLoginForm] = useState(true);
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const url = BASE_URL + '/login';
            const res = await axios.post(url, {
                email: emailId,
                password
            }, {
                withCredentials: true
            });
            if (res.status = 200) {
                dispatch(addUser(res?.data?.data));
                navigate('/');
            }
        } catch (error: any) {
             if (axios.isAxiosError(error)) {
                if (error?.response?.data) {
                    setError(error.response?.data || 'something went wrong!!');
                }
            } else {
                console.error("Unexpected error:", error);
            }
        }
    }

    const handleSignup = async () => {
        try {
            const resSignUp = await axios.post(BASE_URL+"/signup", {
                firstName,
                lastName,
                email: emailId,
                password
            }, {withCredentials: true});
            if(resSignUp.status === 200) {
                dispatch(addUser(resSignUp?.data?.data));
                navigate("/profile");
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
    }

    return (
        <div className="flex justify-center my-4">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                <legend className="fieldset-legend mx-auto text-2xl">{isLoginForm ? "Login" : "Sign Up"}</legend>

                {!isLoginForm && (<><label className="label">FirstName</label>
                <input type="text" className="input" placeholder="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                
                <label className="label">LastName</label>
                <input type="text" className="input" placeholder="Lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} /></>)}

                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" value={emailId} onChange={(e) => setEmailId(e.target.value)} />

                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <p className="text-error text-base py-1">{error}</p>

                <button 
                    className="btn btn-sm btn-neutral w-xs  mt-4" 
                    onClick={isLoginForm ? handleLogin : handleSignup}
                >{isLoginForm ? "Login" : "Sign Up"}
                </button>
                <p className="text-center text-accent-content text-base py-2" onClick={() => setLoginForm(!isLoginForm) ?? setError("")}>
                    {isLoginForm ? "New User ? Sign Up" : "Existing User ? Login"}
                </p>

            </fieldset>
        </div>
    )
}
export default Login;