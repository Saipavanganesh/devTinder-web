import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import UserFeed from './UserFeed';
import { useDispatch } from 'react-redux';
import { addUser } from "../utils/userSlice"

const EditProfile = ({ user }) => {

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();
    const saveProfile = async () => {
        setError("");
        try {
            const res = await axios.put(
                BASE_URL + "/profile/edit",
                { firstName, lastName, photoUrl, age, gender, about },
                { withCredentials: true })
            dispatch(addUser(res?.data?.data))
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 3000);
        } catch (error) {
            setError(error.response.data)
        }
    }
    return (
        <div className='flex justify-center my-4'>
            <div className='flex justify-center px-4' >
                <div className="card bg-base-300 w-96 shadow-sm">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Profile</h2>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">First Name</legend>
                            <input type="text" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Last Name</legend>
                            <input type="text" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Photo</legend>
                            <input type="text" className="input" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Age</legend>
                            <input type="text" className="input" value={age} onChange={(e) => setAge(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Gender</legend>
                            <input type="text" className="input" value={gender} onChange={(e) => setGender(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">About</legend>
                            <input type="text" className="input" value={about} onChange={(e) => setAbout(e.target.value)} />
                        </fieldset>
                        {error &&
                            <p className='text-red-500'>{error}</p>
                        }
                        <div className="card-actions justify-center m-2">
                            <button className="btn btn-primary" onClick={saveProfile} >Save Profile</button>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <UserFeed user={{ firstName, lastName, photoUrl, age, gender, about }} />
            </div>
            {showToast && <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                    <span>Profile saved successfully.</span>
                </div>
            </div>}
        </div>

    )
}

export default EditProfile