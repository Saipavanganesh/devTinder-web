import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { removeUser } from '../utils/userSlice'
import { clearFeed } from '../utils/feedSlice'

const NavBar = () => {
    const user = useSelector((store) => store.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const res = await axios.post(BASE_URL + '/logout', {}, {
                withCredentials: true,
            })
            console.log(res);
            if (res.status === 200) {
                dispatch(removeUser())
                dispatch(clearFeed())
                navigate("/login")
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <Link className="btn btn-ghost text-xl" to={"/"}>👨🏼‍💻DevTinder</Link>
            </div>
            {user && <div className="flex gap-2">
                <div className="form-control flex items-center">Welcome {user.firstName}</div>
                <div className="dropdown dropdown-end mx-4 flex">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="User Photo"
                                src={user.photoUrl} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link className="justify-between" to={"/profile"}>
                                Profile
                            </Link>
                        </li>
                        <li><Link to={"/connections"}>Connections</Link></li>
                        <li><Link to={"/requests"}>Requests</Link></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>}
        </div>
    )
}

export default NavBar