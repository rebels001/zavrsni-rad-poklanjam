import React from 'react'
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux"
import PropTypes from "prop-types"
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({
  duration: 3000,
  easing: "ease-in-out-cubic"
});


const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/posts' />
  }

  return (
    <section className="homepage">
      <div className="overlay">
        <div className="homepage-inner">
          <h1 className="title-text" data-aos="fade">Poklanjam.hr</h1>
          <p className="lead">
          </p>
          <div className="buttons">
            <Link to="register" className="btn btn-primary" data-aos="fade" data-aos-delay="50">Registriraj se</Link>
            <Link to="login" className="btn btn-light" data-aos="fade" data-aos-delay="100">Prijavi se</Link>
          </div> <br />
          <div data-aos="fade" data-aos-delay="150">
            <p className="lead">Možeš pogledati oglase i bez prijave</p>
          </div>
          <div className="buttons" data-aos="fade" data-aos-delay="150">
            <Link to="posts" className="btn btn-primary">Pogledaj oglase</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);