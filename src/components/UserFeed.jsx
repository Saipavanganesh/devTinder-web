import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserFeed = ({ user }) => {
    const dispatch = useDispatch();
    const handleFeed = async (status, _id) => {
        try {
            const res = await axios.post(`${BASE_URL}/request/send/${status}/${_id}`, {},
                { withCredentials: true });
            dispatch(removeUserFromFeed(_id));
        }
        catch (err) {
            // setError(err?.response?.data || "Something went wrong");
            console.log(err);
        }
    }
    const { _id, firstName, lastName, photoUrl, age, gender, about } = user
    return (
        <div className="card bg-base-300 w-96 shadow-sm">
            <figure>
                <img
                    src={photoUrl}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName} {lastName}</h2>
                {age && gender && <p>{age} {gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-evenly my-2">
                    <button className="btn btn-error" onClick={() => handleFeed("ignored", _id)}>Ignore</button>
                    <button className="btn btn-primary" onClick={() => handleFeed("interested", _id)}>Interested</button>
                </div>
            </div>
        </div>)
}

export default UserFeed