import React, { useState, useEffect } from 'react';
import './Profile.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from '../userSlice';
import { getBySales } from '../../../services/apiCalls';
import { SaleCard } from '../../../common/SaleCard/SaleCard';




export const Profile = () => {

    const navigate = useNavigate();
    const [sales, setSales] = useState([]);
    const userRDX = useSelector(userData);

    useEffect(() => {
        if (userRDX.userPass.token === '') {
            navigate('/');
        };
    }, []);

    useEffect(() => {

        if (sales.length === 0) {

            setTimeout(() => {

                getBySales(userRDX.userPass.token, userRDX.userPass._id)


                    .then(
                        resultado => {

                            setSales(resultado.data);

                        }
                    )
                    .catch(error => console.log(error));

            }, 1000);

        };

    }, [sales]);








  

    return (
        <div className='profileDesign'>
            <div>Nombre: {userRDX.userPass.name}</div>
            <div>Email: {userRDX.userPass.token.data.userFound[0].email} {userRDX.userPass.email}</div>
            <div className='rosterDesign'>
                {sales.length > 0 &&
                    sales.map(
                        sale => {
                            return (
                                <div key={sale._id}>
                                    <SaleCard sale={sale} />
                                </div>
                            )
                        }
                    )
                }
            </div>
            
        </div>
    )
}


