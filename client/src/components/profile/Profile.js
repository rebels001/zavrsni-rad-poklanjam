import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../actions/profile';
import ProfileAbout from "./ProfileAbout"
import Spinner from '../layout/Spinner';
import auth from '../../reducers/auth';

const Profile = ({ getProfileById, profile: { profile, loading }, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <ProfileAbout profile={profile} />
      {auth.isAutheticated && auth.loading === false && auth.user._id === profile.user._id && 
        (<Link to="/edit-profile" className="btn btn-dark">Promijeni profil</Link>)}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, { getProfileById })(Profile);