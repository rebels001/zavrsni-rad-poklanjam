import React, { Fragment, useState } from 'react'
import { Link, withRouter } from "react-router-dom"
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { createProfil } from "../../actions/profile"

const CreateProfil = ({ createProfil, history }) => {
    const [formData, setFormData] = useState({
        location:"",
        telephone:"",
        bio:""
    })

    //const [displaySocialInputs, toggleSocialInputs] = useState(false);

    const {
        location,
        telephone,
        bio,
    } = formData
    
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        createProfil(formData, history);
    }

    return (
        <Fragment>
             <h1 className="large text-primary">
                Dodaj još nekoliko informacija o sebi
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Neki tekst
            </p>
            <form className="form" onSubmit={e => onSubmit(e)}>         
                <div className="form-group">
                    <input type="text" placeholder="Grad" name="location" value={location} onChange={e => onChange(e)}/>
                    <small className="form-text">Grad</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Broj mobitela" name="telephone" value={telephone} onChange={e => onChange(e)}/>
                    <small className="form-text">Broj mobitela</small>
                </div>
                <div className="form-group">
                    <textarea placeholder="Opis" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
                    <small className="form-text">Napiši nešto o sebi (optimalno)</small>
                </div>
               
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/posts">Go Back</Link>
            </form>
        </Fragment>
    )
}

CreateProfil.propTypes = {
    createProfil: PropTypes.func.isRequired
}

export default connect(null, { createProfil })(withRouter(CreateProfil))
