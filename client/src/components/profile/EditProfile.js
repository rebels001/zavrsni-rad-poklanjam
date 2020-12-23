import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfil, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({ profile: { profile, loading }, createProfil, getCurrentProfile, history }) => {
	const [ formData, setFormData ] = useState({
		location: '',
		telephone: '',
		bio: ''
	});

	useEffect(
		() => {
			getCurrentProfile();

			setFormData({
				location: loading || !profile.location ? '' : profile.location,
				telephone: loading || !profile.telephone ? '' : profile.telephone,
				bio: loading || !profile.bio ? '' : profile.bio
			});
		},
		[ loading ]
	);

	const { location, telephone, bio } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		createProfil(formData, history);
	};

	return (
		<Fragment>
			<div className="flex">
				<div className="auth-container">
					<h1 className="medium text-primary">Izmijeni informacije o sebi</h1>
					<form className="form" onSubmit={(e) => onSubmit(e)}>
						<div className="form-group">
							<input
								type="text"
								placeholder="Grad"
								name="location"
								value={location}
								onChange={(e) => onChange(e)}
							/>
							<small className="form-text">Grad ili županija u kojoj se nalazite</small>
						</div>
						<div className="form-group">
							<input
								type="text"
								placeholder="Broj mobitela"
								name="telephone"
								value={telephone}
								onChange={(e) => onChange(e)}
							/>
							<small className="form-text">Broj mobitela</small>
						</div>
						<div className="form-group">
							<textarea placeholder="Opis" name="bio" value={bio} onChange={(e) => onChange(e)} />
							<small className="form-text">Nešto o sebi (optimalno)</small>
						</div>

						<input type="submit" className="btn btn-primary my-1" value="Potvrdi" />
						<Link className="btn btn-light my-1" to="/posts">
							Nazad
						</Link>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

EditProfile.propTypes = {
	createProfil: PropTypes.func.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	profile: state.profile
});

export default connect(mapStateToProps, { createProfil, getCurrentProfile })(withRouter(EditProfile));
