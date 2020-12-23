import React, { Fragment } from 'react'
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { logout } from "../../actions/auth"

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
       <li>
          <Link to="/posts">
            Oglasi
          </Link>
        </li>
        <li>
          <Link to="/edit-profile">
            Uredi profil
          </Link>
        </li>
        <li>
            <Link onClick={logout} to="#!">
              <i className="fas fa-sign-out-alt"></i> {""}
              <span className="hide-sm">Odjava</span>
            </Link>
        </li>
      </ul>
  )

  const guestLinks = (
    <ul>
        <li>
          <Link to="/">
            <span className="hide-sm">Naslovna</span>
          </Link>
        </li>
       <li>
          <Link to="/posts">
            Oglasi
          </Link>
        </li>
        <li>
            <Link to="/register">Registracija</Link>
        </li>
        <li>
            <Link to="/login">Prijava</Link>
        </li>
      </ul>
  )

    return (
      <nav className="navbar">
        <h1>
          <Link to="/"><i className="fas fa-hand-holding-heart"></i> Poklanjam.hr</Link>
        </h1>
        { !loading && (<Fragment> { isAuthenticated ? authLinks: guestLinks}</Fragment>)}
      </nav>
    )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);
