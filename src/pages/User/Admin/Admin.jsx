
import React, { useState, useEffect } from 'react';
import './Admin.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from '../userSlice';
import { allUsersAdmin } from '../../../services/apiCalls';


export const Admin = () => {
    const navigate = useNavigate();
    const userRDX = useSelector(userData);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        if (userRDX.userPass.rol !== 'admin') {
            navigate("/");
        }
    }, [])

    useEffect(() => {
        if (allUsers.length === 0) {
            allUsersAdmin(userRDX.userPass.token.data.token)
                .then(resultado => {
                    setAllUsers(resultado.data);
                })
                .catch(error => console.log(error));
        };
    }, [allUsers]);

    return (
        <div className='adminDesign'>
            <div>Todos los usuarios</div>
            <div></div>
            <div className='rosterDesign'>
                {allUsers.length > 0 &&
                    allUsers.map(
                        user => {
                            return (
                                <div key={user._id}>
                                    {/* <CardRental rental={rental} /> */}
                                </div>
                            )
                        }
                    )
                }
            </div>
        </div>
    )
};


