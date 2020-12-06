import React, { useContext } from "react"
import { Link, useLocation } from 'react-router-dom';
import './style.scss';
import { LogInContext } from '../../context/auth'

interface IProps {

}

const Header = (props: IProps) => {
    const auth = useContext(LogInContext);
    const location = useLocation();
    return <>
        <nav id="navbar" className="navbar navbar-light bg-light navbar-fixed-top">
            <Link to="/" className="navbar-brand"><b>Linqpal</b></Link>
            <ul className="nav nav-pills">
                {auth.loginStatus ? <>
                    <li className="nav-item" id="introm">
                        {location.pathname === '/' ?
                            <Link to="/admin/users" className="nav-link">Users</Link> :
                            <Link to="/" className="nav-link">Register</Link>
                        }

                    </li>
                    <li>
                        <a onClick={() => auth.logout()} className="nav-link" href="#">Logout</a>
                    </li>
                </> :
                    <>
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Register</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin" className="nav-link">Admin</Link>
                        </li>
                    </>
                }

            </ul>
        </nav>
    </>
}

export default Header;