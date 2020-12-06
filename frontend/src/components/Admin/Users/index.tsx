import React, { useState, useEffect, useContext } from "react"
import { Redirect } from 'react-router-dom';
import { LogInContext } from '../../../context/auth';
import './style.scss';
import IUser from '../../../interfaces/IUser';
import { fetchUsers } from '../../../actions/admin';

interface IProps {
    history: any
}

const Users = (props: IProps) => {
    const [users, setUsers] = useState<IUser[]>([]);

    const auth = useContext(LogInContext);
    useEffect(() => {
        if (!auth.loginStatus) {
            props.history.push('/admin');
        } else {
            getAllUsers();
        }
    }, [auth.loginStatus])

    useEffect(() => {
        console.log(users);
    }, [users])

    const getAllUsers = async () => {
        const fetchedUsers = await fetchUsers();
        console.log(fetchedUsers);
        setUsers(fetchedUsers);
    }

    return <div className="user-data container">
        <div className="row">
            <div className="col-12">
                <h2 className="contact-cta text-center">
                    User Registrations
                </h2>
            </div>
        </div>

        <div className="row">
            <table className="table table-bordered mt-4 table-hover">
                <thead>
                    <tr>
                        <th scope="col" className="text-center">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Telephone</th>
                        <th scope="col">SSN</th>
                        <th scope="col">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, key) => {
                       return <tr key={key}>
                            <th scope="row" className="text-center">{user.id}</th>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.telephone}</td>
                            <td>{user.ssn}</td>
                            <td>{user.address}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>

    </div>
}

export default Users;