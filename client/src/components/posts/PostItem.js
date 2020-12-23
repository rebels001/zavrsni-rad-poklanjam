import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/post';

const PostItem = ({
  deletePost,
  auth,
  post: { _id, text, user, date, tittle, imageUrl, itemLocation, category },
  showActions
}) => (    
    <div className='post bg-white p-1 my-1'>
      <Link to={`/posts/${_id}`}>
        <div className="image-postItem">
            <div className='img-item'>{imageUrl && <img src={imageUrl} alt={tittle} />}</div>
        </div>
      </Link>

      <div>
        <Link to={`/posts/${_id}`}>
            <h1>{tittle}</h1>
            <p className='my-1 text-dark'>{text}</p>
            <p className="location">{itemLocation}</p>
            <p className='post-date'>
              Objavljeno na <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
        </Link>

        <div className="x-button">
          {showActions && (
            <>
              {!auth.loading && user === auth.user._id && (
                <button
                  onClick={() => deletePost(_id)}
                  type='button'
                  className='btn btn-danger btn-remove'
                >
                  <i className='fas fa-times' />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>

);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost }
)(PostItem);
