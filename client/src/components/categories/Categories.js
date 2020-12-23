import React from 'react';

const Categories = ({ categories, filterPosts }) => {
	return (
		<div className="category-container">
			{categories.map((category) => {
				return (
					<div className="category-item">
						<button className="btn" onClick={() => filterPosts(category)}>
							{category}
						</button>
					</div>
				);
			})}
		</div>
	);
};

export default Categories;
