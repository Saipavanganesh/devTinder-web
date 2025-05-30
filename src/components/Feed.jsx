import axios from 'axios'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserFeed from './UserFeed';

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();
    const [pageNumber, setPageNumber] = useState(1);
    const [limit, setLimit] = useState(10);


    const getFeed = async () => {
        if (feed) return;
        try {
            const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
            console.log(res.data.data);
            dispatch(addFeed(res?.data?.data));
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getFeed();
    }, [])
    if (!feed) return
    if (feed.length <= 0) return <h1 className='flex justify-center my-10'>No users found </h1>
    return feed && (
        <div className='flex justify-center my-5'>
            <UserFeed user={feed[0]} />
        </div>
    )
}

export default Feed