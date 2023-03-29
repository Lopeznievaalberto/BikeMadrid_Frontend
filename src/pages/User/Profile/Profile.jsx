import React, { useState, useEffect } from 'react';
import './Profile.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { userData } from '../userSlice';
import { getBySales } from '../../../services/apiCalls';




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








    const filterName = allRentals.filter((name) => name.nameUser === userRDX.userPass.name)

    return (
        <div className='profileDesign'>
            <div>Nombre: {userRDX.userPass.name}</div>
            <div>Email: {userRDX.userPass.token.data.userFound[0].email} {userRDX.userPass.email}</div>
            <div className='rosterDesign'>
                {allRentals.length > 0 &&
                    filterName.map(
                        rental => {
                            return (
                                <div key={rental._id}>
                                    <CardRental rental={rental} />
                                </div>
                            )
                        }
                    )
                }
            </div>
            <div className='Historic'>Historic</div>
            {sales.length > 0 &&
                sales.map(
                    sale => {
                        return (
                            <div key={sale._id}>
                                <div>ID Pala: {sale.bike_id}</div>
                                <div>Fecha de compra: {sale.date}</div>
                                <div>Precio: {sale.price} €</div>
                            </div>
                        )
                    }
                )

            }
        </div>
    )
}


