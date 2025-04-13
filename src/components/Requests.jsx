import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { addRequests } from '../utils/requestSlice';

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();
    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
            dispatch(addRequests(res.data.data));
        }
        catch (err) {
            // setError(err?.response?.data || "Something went wrong");
            console.log(err);
        }
    }
    useEffect(() => {
        fetchRequests();
    }, [])


    if (!requests) return;
    if (requests.length === 0) return <h1>No Requests</h1>;
    return (
        <div className='text-center my-10'>
            <h1 className='text-bold text-white text-3xl'>Requests</h1>
            {
                requests.map((request) => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId
                    return (
                        <div key={_id} className='flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto'>
                            <div>
                                <img className='w-20 h-20 rounded-full' src={photoUrl} alt="Photo" />
                            </div>
                            <div className='text-left m-4'>
                                <h2 className='font-bold text-xl'>{firstName} {lastName}</h2>
                                {age && gender && <p>{age}, {gender}</p>}
                                <p>{about}</p>
                            </div>
                            <div>
                            <button className="btn btn-primary mx-2">Primary</button>
                            <button className="btn btn-secondary mx-2">Secondary</button>
                            </div>
                        </div>
                    )

                })
            }
        </div>
    )
}

export default Requests