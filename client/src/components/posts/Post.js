import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import Moment from "react-moment"

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Nazad na sve oglase
      </Link>
      <div className="post-display-container">
        <div>
          <Link to={`/profile/${post.user}`}>
            <h4>{post.name}</h4>
          </Link>
          <p>{post.itemLocation}</p>
          <p>{post.number}</p>
          <h1>{post.tittle}</h1>
          <p className='my-1'>{post.text}</p>
          <p className='post-date'>
            Objavljeno na <Moment format='YYYY/MM/DD'>{post.date}</Moment>
          </p>
        </div>
        <div className="image-container">{post.imageUrl && <img src={post.imageUrl} alt={post.name} />}</div>
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);