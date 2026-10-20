import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || 1);
    const [gender, setGender] = useState(user.gender || "male");
    const [about, setAbout] = useState(user.about);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const editProfile = async () => {
        error && setError("");
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                age,
                gender,
                about,
                photoUrl
            }, { withCredentials: true });
            if (res.status === 200) {
                dispatch(addUser(res?.data?.data));
            }
        } catch (error) {
            setError(error.response?.data?.message || 'something went wrong!!');
        }
    }
    return (
        <div className="flex justify-center gap-4">
            <div className="flex justify-center my-4">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4 gap-3">
                    <legend className="fieldset-legend"></legend>

                    <label className="label">FirstName</label>
                    <input type="text" className="input" placeholder="FirstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                    <label className="label">lastName</label>
                    <input type="text" className="input" placeholder="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />

                    <label className="label">Photo</label>
                    <input type="text" className="input" placeholder="Photo Url" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />

                    <label className="label">Age</label>
                    <input type="number" className="input" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />

                    <div className="flex gap-x-3"><label className="label">Male</label>
                        <input type="radio" name="radio-1" className="radio" defaultChecked={gender === 'male'} value="male" onChange={(e) => setGender(e.target.value)} />
                        <label className="label">Female</label>
                        <input type="radio" name="radio-1" className="radio" value="female" defaultChecked={gender === 'female'} onChange={(e) => setGender(e.target.value)} />
                    </div>
                    <textarea className="textarea" placeholder="About" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
                    {error && <p className="text-error font-bold">{error}</p>}
                    <button className="btn btn-sm btn-neutral w-xs  mt-4" onClick={editProfile}>Save Profile</button>
                </fieldset>
            </div>
            <div className="my-4">
                <UserCard user={{ firstName, lastName, age, gender, about, photoUrl }}></UserCard>
            </div>
        </div>
    )

}

export default EditProfile;