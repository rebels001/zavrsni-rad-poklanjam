import React from 'react'
import { Link } from "react-router-dom"
import PropTypes from 'prop-types'

const ProfileItem = ({ profile: {
    user: { _id, name },
    location,
}}) => {
    return (
        <div className="profile bg-light">
            <div>
                <h2>{name}</h2>
                <p className="my-1">{location}</p>
                <Link to={`/profile/${_id}`} className="btn btn-primary">Pogledaj profil</Link>
            </div>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem
