import React, { useState, useEffect, useContext } from "react"
import { Redirect } from 'react-router-dom';
import {LogInContext} from '../../../context/auth';

interface IProps {
    history: any
}

const Users = (props: IProps) => { 
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        telephone: '',
        address: '',
        ssn: ''
    });
    const [isValidated, setValidated] = useState(false);
    const [sendingState, setSendingState] = useState(0);

    const auth = useContext(LogInContext);
    useEffect(() => {
        if(!auth.loginStatus){
            props.history.push('/admin');
        }
    }, [auth.loginStatus])

    return <div>Users!</div>
}

export default Users;