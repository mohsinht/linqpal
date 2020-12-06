import React, { useState, useEffect, useContext } from "react"
import axios from "axios";
import './style.scss';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { register } from '../../actions/users';

interface IProps {

}

const Register = (props: IProps) => {
    const [isValidated, setValidated] = useState(false);
    const [sendingState, setSendingState] = useState(0);
    const [isError, setError] = useState(false);
    const [dataError, setDataError] = React.useState({
        firstName: false,
        lastName: false,
        address: false,
        telephone: false,
        ssn: false
    });

    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        telephone: '',
        ssn: ''
    })

    const onLogin = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setValidated(true);
        const formErrors = checkErrors();
        console.log(formErrors);
        if (!(formErrors.firstName || formErrors.lastName || formErrors.ssn || formErrors.telephone || formErrors.address)) {
            console.log("YS!")
            setSendingState(1);
            const isSuccessful = await register(data.firstName, data.lastName, data.telephone, data.address, data.ssn);
            if (isSuccessful) {
                setSendingState(2);
                setError(false)
            } else {
                setSendingState(0);
                setError(true)
            }
        }
    }

    const onFormChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        let formattedText = e.target.value;
        if (e.target.name === 'firstName' || e.target.name === 'lastName') {
            if (e.target.value !== '' && !isNameCorrect(formattedText)) {
                formattedText = data[e.target.name]
            }
            if (e.target.value !== '') {
                formattedText = formattedText.charAt(0).toUpperCase() + formattedText.slice(1);
            }
        }
        setData({ ...data, [e.target.name]: formattedText });
        if (isValidated) checkErrors()
    }

    const onTelephoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, telephone: e.target.value });
        if (isValidated) checkErrors()
    }

    const onSSNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, ssn: e.target.value });
        if (isValidated) checkErrors()
    }

    const isNameCorrect = (name: string) => {
        return !(!name.match(/^[A-Za-z.-]+(\s*[A-Za-z.-]+)*$/))
    }

    const checkErrors = () => {
        let errors = {
            firstName: false,
            lastName: false,
            address: false,
            telephone: false,
            ssn: false
        };
        errors['firstName'] = !isNameCorrect(data.firstName);
        errors['lastName'] = !isNameCorrect(data.lastName);
        errors['address'] = data.address.length === 0;
        errors['ssn'] = data.ssn.includes('_') || data.ssn === "";
        errors['telephone'] = data.telephone.includes('_') || data.telephone === "";

        setDataError(errors);
        return errors;
    }

    return <div className="user-registration container">
        <div className="row">
            <div className="col-12">
                <h2 className="contact-cta text-center">
                    User Registration
                    </h2>
            </div>
        </div>
        <div className="row">
            <form className={`w-100 mt-1 ${isValidated ? 'validated' : null}`}>
                <div className="w-100 register-form">
                    <div className="row">
                        <div className="col-md-6 form-group reg-group">
                            <label htmlFor="firstName">First Name</label>
                            <input name="firstName" id="firstName" value={data.firstName} onChange={(e) => onFormChange(e)} placeholder="John" type="text" className={`form-control ${dataError.firstName ? 'invalid' : "valid"}`} />
                        </div>
                        <div className="col-md-6 form-group reg-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input name="lastName" id="lastName" value={data.lastName} onChange={(e) => onFormChange(e)} placeholder="Doe" type="text" className={`form-control ${dataError.lastName ? 'invalid' : "valid"}`} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group reg-group custom-mask">
                            <label htmlFor="telephone">Telephone</label>
                            <InputMask placeholder="+1 (415) 931-1631" value={data.telephone} mask="+\1 (999) 999 9999" onChange={(e) => onTelephoneChange(e)} className={`form-control ${dataError.telephone ? 'invalid' : "valid"}`} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group reg-group">
                            <label htmlFor="address">Full Address</label>
                            <textarea name="address" id="address" value={data.address} onChange={(e) => onFormChange(e)} placeholder="123 Mcallister St
San Francisco, California(CA), 94102" className={`form-control ${dataError.telephone ? 'invalid' : "valid"}`} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 form-group reg-group custom-mask">
                            <label htmlFor="ssn">Social Security Number</label>
                            <InputMask placeholder="415-931-1631" value={data.ssn} mask="999-999-9999" onChange={(e) => onSSNChange(e)} className={`form-control ${dataError.ssn ? 'invalid' : "valid"}`} />
                        </div>
                    </div>
                    <div className="row">
                        <button className="btn btn-primary mt-4" onClick={onLogin} disabled={sendingState === 1 || sendingState === 2}>
                            {sendingState === 0 ? 'Register' : sendingState === 1 ? "Submitting info..." : sendingState === 2 ? "Successful!" : "Failed"}</button>
                        {isError ? <div className="mt-3">Incorrect username or password</div> : null}
                    </div>
                </div>
            </form>
        </div>
    </div>
}

export default Register;