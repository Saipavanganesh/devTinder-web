import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailId, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoginForm, setIsLogin] = useState(true);
    const dispatch = useDispatch();
    const Navigate = useNavigate();


    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL + "/login", {
                emailId,
                password
            }, { withCredentials: true });
            console.log(res.data);
            dispatch(addUser(res.data));
            return Navigate("/");
        }
        catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    }
    const handleSignup = async () => {
        try {
            const res = await axios.post(BASE_URL + "/signup", {
                firstName,
                lastName,
                emailId,
                password
            }, { withCredentials: true });
            console.log(res.data);
            dispatch(addUser(res.data.data));
            return Navigate("/profile");
        }
        catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    }
    const handleChange = (value) => {
        try {
            setIsLogin(!value)
        }
        catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    }
    return (
        <div className='flex justify-center my-10'>
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title justify-center">{isLoginForm ? "Login" : "Sign Up"}</h2>
                    {!isLoginForm && <>
                        <div>
                            <label className="input my-2">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
                                <input type="input" required placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </label>
                        </div>
                        <div>
                            <label className="input my-2">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
                                <input type="input" required placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </label>
                        </div>
                    </>}
                    <div>
                        <label className="input my-2">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
                            <input type="input" required placeholder="Email" value={emailId} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label className="input my-2">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
                            <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                    </div>
                    <p className='text-red-500'>{error}</p>
                    <div className="card-actions justify-center m-2">
                        <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignup}>{isLoginForm ? "Login" : "Sign Up"}</button>
                    </div>
                    <p className='text-blue-500 cursor-pointer text-center py-5' onClick={() => handleChange(isLoginForm)}>{isLoginForm ? "New User? Sign Up Here" : "Existing User? Login Here"}</p>

                </div>
            </div>

        </div>
    )
}

export default Login