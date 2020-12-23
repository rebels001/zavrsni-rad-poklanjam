import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import Categories from "../categories/Categories"
import { getPosts } from '../../actions/post';

/*const itemsCategory = [
  {
      name: "Odjeća i obuća",
      id: 1
  },
  {
      name: "Igračke",
      id: 2
  },
  {
      name: "Ljubimci",
      id: 3
  },
  {
      name: "Ostalo",
      id: 4
  },
]

const allCategories = ["sve",...new Set(itemsCategory.map((category) => category.name))]
*/

const Posts = ({ getPosts, post: { posts }, auth: { isAuthenticated} }) => {
  useEffect(() => {
    getPosts()
  },[getPosts])

 /* const [categories, setCategories] = useState(allCategories)
  const [postItems, setPostItems] = useState(posts)

  const filterPosts = (category) => {
    if(category === "sve")
      return setPostItems(posts)

    const newPosts = posts.filter((item) => item.category === category)
    setPostItems(newPosts)
  }

  console.log(posts)*/

  return (
    <Fragment>
      <h1 className="xxl text-primary center">Oglasi</h1>
      
      {/*<Categories filterPosts={filterPosts} categories={categories} />*/}
    
      { isAuthenticated ? <PostForm />: (
      <div className="must-login">
        <Link to="/login">Prijavite se</Link> ako želite postaviti oglas
      </div>) }
        
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post}/>       
        ))}
      </div>

      { isAuthenticated ? <PostForm />: (
      <div className="must-login">
        <Link to="/login">Prijavite se</Link> ako želite postaviti oglas
      </div>) }
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPosts })(Posts);