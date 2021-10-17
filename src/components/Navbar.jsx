import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
            <Link to="/" className="navbar-brand text-uppercase">
                <span className="brand-ico"><i className="fab fa-react"></i></span>My React App
            </Link>
            <button className="navbar-toggler me-3" type="button" data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
            aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse me-3" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto text-uppercase">
                    <li className="nav-item">
                        <NavLink 
                            className="nav-link me-3 ms-3" 
                            to="/"
                            exact
                        >
                            Home
                            <i className="fas fa-home ms-2"></i>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink 
                            className="nav-link me-3 ms-3" 
                            to="/admin"
                        >
                            Admin
                            <i className="fas fa-user-cog ms-2"></i>
                         </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink 
                            className="nav-link me-3 ms-3" 
                            to="/login"
                        >
                            Login
                            <i className="fas fa-user ms-2"></i>
                        </NavLink>
                    </li>
                </ul>
                
            </div>
        </nav>
    )
}

export default Navbar