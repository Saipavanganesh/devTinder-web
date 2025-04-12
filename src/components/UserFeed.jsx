import React from 'react'

const UserFeed = ({user}) => {
    const {firstName, lastName, photoUrl, age, gender, about, skills} = user
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
                    <button className="btn btn-error">Ignore</button>
                    <button className="btn btn-primary">Interested</button>
                </div>
            </div>
        </div>)
}

export default UserFeed