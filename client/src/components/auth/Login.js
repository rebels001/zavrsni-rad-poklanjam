import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
	const [ formData, setFormData ] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = async (e) => {
		e.preventDefault();
		login(email, password);
	};

	//Redirect if logged in
	if (isAuthenticated) {
		return <Redirect to="/posts" />;
	}

	return (
		<Fragment>
			<div className="flex">
				<div className="auth-container">
					<h1 className="large text-primary">Prijava</h1>
					<form className="form" onSubmit={(e) => onSubmit(e)}>
						<div className="form-group" />
						<div className="form-group">
							<input
								type="email"
								placeholder="Email"
								name="email"
								value={email}
								onChange={(e) => onChange(e)}
								required
							/>
						</div>
						<div className="form-group">
							<input
								type="password"
								placeholder="Lozinka"
								name="password"
								minLength="6"
								value={password}
								onChange={(e) => onChange(e)}
								required
							/>
						</div>
						<div className="form-group" />
						<input type="submit" className="btn btn-primary" value="Prijava" />
					</form>
					<p className="my-1">
						Nemaš napravljen račun? <Link to="/register">Registriraj se</Link>
					</p>
				</div>
			</div>
		</Fragment>
	);
};

Login.protoTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
