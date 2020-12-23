import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ register, isAuthenticated }) => {
	const [ formData, setFormData ] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const { name, email, password, password2 } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			console.log("lozinke nisu iste")
		} else {
			register({ name, email, password });
		}
	};

	if (isAuthenticated) {
		return <Redirect to="/posts" />;
	}

	return (
		<Fragment>
			<div className="flex">
				<div className="auth-container">
					<h1 className="large text-primary">Registriraj se</h1>
					<p className="lead">
						<i className="fas fa-user" /> Napravi svoj račun
					</p>
					<form className="form" onSubmit={(e) => onSubmit(e)}>
						<div className="form-group">
							<input
								type="text"
								className="inputic"
								placeholder="Ime"
								name="name"
								value={name}
								onChange={(e) => onChange(e)}
							/>
						</div>
						<div className="form-group">
							<input
								type="email"
								placeholder="Email"
								name="email"
								value={email}
								onChange={(e) => onChange(e)}
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
							/>
						</div>
						<div className="form-group">
							<input
								type="password"
								placeholder="Potvrdi Lozinku"
								name="password2"
								minLength="6"
								value={password2}
								onChange={(e) => onChange(e)}
							/>
						</div>
						<input type="submit" className="btn btn-primary" value="Registriraj se" />
					</form>
					<p className="my-1">
						Već imaš napravljen račun? <Link to="login">Prijavi se</Link>
					</p>
				</div>
			</div>
		</Fragment>
	);
};

Register.propTypes = {
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);
