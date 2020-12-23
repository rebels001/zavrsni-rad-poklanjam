import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost, updatePost } from '../../actions/post';

const PostForm = ({ addPost, updatePost }) => {
	const [ text, setText ] = useState('');
	const [ tittle, setTittle ] = useState('');
	const [ itemLocation, setLocation ] = useState('');
	const [ number, setNumber ] = useState('');
	const [ image, setImage ] = useState('');
	const [ date, setDate ] = useState(Date.now);
	const [ displayNewPost, toggleNewPost ] = useState(false);
	const [ category, setCategory ] = useState('');

	const postDetails = async (url) => {
		const data = new FormData();

		data.append('file', image);
		data.append('upload_preset', 'zavrsni-rad');
		data.append('cloud_name', 'ddauabmg9');
		fetch('https://api.cloudinary.com/v1_1/ddauabmg9/image/upload', {
			method: 'post',
			body: data
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				try {
					updatePost({ id: data.id, url: data.url });
					console.log(data.url);
				} catch (error) {
					console.error('Ne radi');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="post-form">
			<div>
				<button onClick={() => toggleNewPost(!displayNewPost)} type="button" className="btn btn-light">
					Dodaj objavu
				</button>
			</div>

			{displayNewPost && (
				<Fragment>
					<div className="new-post">
						<form
							className="form my-1"
							onSubmit={(e) => {
								e.preventDefault();
								addPost({ text, tittle, itemLocation, number, image, date, category });
								setText('');
								setTittle('');
								setLocation('');
								setNumber('');
								setDate('');
								setCategory('');
							}}
						>
							<textarea
								name="text"
								cols="30"
								rows="2"
								placeholder="Naslov"
								value={tittle}
								onChange={(e) => setTittle(e.target.value)}
								required
							/>
							<textarea
								name="text"
								cols="30"
								rows="5"
								placeholder="Tekst"
								value={text}
								onChange={(e) => setText(e.target.value)}
								required
							/>
							<textarea
								name="text"
								cols="30"
								rows="1"
								placeholder="Lokacija"
								value={itemLocation}
								onChange={(e) => setLocation(e.target.value)}
								required
							/>
							<textarea
								name="text"
								cols="30"
								rows="1"
								placeholder="Broj mobitela"
								value={number}
								onChange={(e) => setNumber(e.target.value)}
								required
							/>
							<div className="form-group">
								<select name="status" onChange={(e) => setCategory(e.target.value)}>
									<option value="">Odaberi kategoriju</option>
									<option value="Odjeća i obuća">Odjeća i obuća</option>
									<option value="Igračke">Igračke</option>
									<option value="Ljubimci">Kučni ljubimci</option>
									<option value="Ostalo">Ostalo</option>
								</select>
							</div>
							<div>
								<span>Dodaj sliku</span>
								<input type="file" onChange={(e) => setImage(e.target.files[0])} />
							</div>
							<input type="submit" className="btn btn-primary my-1" value="Objavi" />
						</form>
					</div>
				</Fragment>
			)}
		</div>
	);
};

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
	updatePost: PropTypes.func.isRequired
};

export default connect(null, { addPost, updatePost })(PostForm);
