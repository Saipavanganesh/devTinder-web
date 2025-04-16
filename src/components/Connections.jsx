import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { addConnection } from '../utils/connectionSlice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Connections = () => {
    const connections = useSelector((store) => store.connection);
    const dispatch = useDispatch();
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            dispatch(addConnection(res.data.data));

        }
        catch (err) {
            // setError(err?.response?.data || "Something went wrong");
            console.log(err);
        }
    }
    useEffect(() => {
        fetchConnections();
    }, [])
    if (!connections) return;
    if (connections.length === 0) return <h1>No Connections</h1>;
    return (
        <div className='text-center my-10'>
            <h1 className='text-bold text-white text-3xl'>Connections</h1>
            {
                connections.map((connection) => {
                    const { _id, firstName, lastName, photoUrl, age, gender, about } = connection
                    return (
                        <div key={_id} className='flex items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto'>
                            <div>
                                <img className='w-20 h-20 rounded-full' src={photoUrl} alt="Photo" />
                            </div>
                            <div className='text-left m-4'>
                                <h2 className='font-bold text-xl'>{firstName} {lastName}</h2>
                                {age && gender && <p>{age}, {gender}</p>}
                                <p>{about}</p>
                            </div>
                            <Link to={`/chat/${_id}`} className='ml-auto'>
                                <button className='btn btn-primary ' >Chat</button>
                            </Link>
                        </div>
                    )

                })
            }


        </div>




    )
}

export default Connections