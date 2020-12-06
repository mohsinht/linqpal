import React, { useState, useEffect, useContext } from "react"
import './style.scss';
import { login, isLoggedIn } from '../../../actions/admin';
import { Redirect } from 'react-router-dom';
import {LogInContext} from '../../../context/auth';

interface IProps {
    history: any
}

const AdminLogin = (props: IProps) => {
    const auth = useContext(LogInContext);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isValidated, setValidated] = useState(false);
    const [sendingState, setSendingState] = useState(0);
    const [isError, setError] = useState(false);

    useEffect(() => {
        if(isLoggedIn()) {
            auth.login();
            props.history.push('/admin/users');
        }
    })

    const onLogin = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setValidated(true);
        if (isNameCorrect()) {
            setSendingState(1);
            const isSuccessful = await login(name, password);
            console.log(isSuccessful);
            if (isSuccessful) {
                setSendingState(2);
                setError(false)
            }else{
                setSendingState(0);
                setError(true)
            }
        }
    }

    const isNameCorrect = () => {
        if (name.includes("@"))
            return !(!name.match(
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ))
        return !(!name.match(/^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/))
    }

    return <div className="admin-login container">
        <div className="row">
            <div className="col-12">
                <h2 className="contact-cta text-center">
                    Admin Login
                </h2>
            </div>
        </div>
        <div className="row">
            <form className="w-100 mt-4">
                <div className="w-100 text-center login-form">
                    <input value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Username/Email" type="text" className={`form-control text-center ${isNameCorrect() ? 'valid' : 'invalid'}`} />
                    <input value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" type="password" className="form-control text-center mt-3" />
                    <button className="btn btn-primary mt-3" onClick={onLogin} disabled={sendingState === 1 || sendingState === 2}>
                        {sendingState === 0 ? 'Login' : sendingState === 1 ? "Logging in..." : sendingState === 2 ? "Successful!" : "Failed"}</button>
                        {isError ? <div className="mt-3">Incorrect username or password</div> : null}
                </div>
            </form>
        </div>
    </div>
}

export default AdminLogin;