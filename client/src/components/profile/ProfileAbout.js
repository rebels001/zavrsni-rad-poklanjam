import React from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({ profile }) => {
    return (
        <div>
            <p>{profile.user.name}</p>
            <p>{profile.location}</p>
            <p>{profile.telephone}</p>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileAbout
