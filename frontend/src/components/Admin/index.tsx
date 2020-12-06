import React, { useState, useEffect } from "react"
import { login, isLoggedIn } from '../../actions/admin';
import { Redirect } from 'react-router-dom';

interface IProps {
    history: any
}

const Admin = (props: IProps) => {
    useEffect(() => {
        if(isLoggedIn()) {
            props.history.push('/admin/users');
        }else{
            props.history.push('/admin/login');
        }
    })
    return <div className="admin-login container">
        <div className="row">
            <div className="col-12">
                <h2 className="contact-cta text-center">
                    Admin Login
                </h2>
            </div>
        </div>
    </div>
}

export default Admin;