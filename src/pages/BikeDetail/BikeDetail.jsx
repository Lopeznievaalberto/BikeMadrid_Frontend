
import React, { useState } from 'react';
import './BikeDetail.scss';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { bikeData } from '../bikeSlice';
import { userData } from '../User/userSlice';
import { postSale } from '../../services/apiCalls';


export const BikeDetail = () => {
    const detailRdx = useSelector(bikeData);
    const detailUsr = useSelector(userData);
    const navigate = useNavigate();
    const [msg, setMsg] = useState('');

    const Sale = () => {
        let body = {
            bike_id: detailRdx.choosen._id,
            bikeModel: detailRdx.choosen.model,
            user_id: detailUsr.userPass._id,
            userName: detailUsr.userPass.name,
            rentalDate: dayjs().format('DD/MM/YYYY'),
            price: detailRdx.choosen.price
        }

        postSale(body, detailUsr.userPass.token)
            .then(resultado => {
                setMsg(resultado.data)

                setTimeout(() => {
                    navigate('/');
                }, 1500);
            })
            .catch(error => {
                setMsg(error.message)
            })
    }

    return (
        <div className='bikeDesign'>
            {detailRdx.choosen._id !== '' && (
                <div className='bikeDetailCard'>

                    <img className='detailPoster' src={`${detailRdx.choosen.img}`} />
                    {console.log(detailRdx)}
                    <div>Marca: {detailRdx.choosen.brand}</div>
                    <div>Modelo: {detailRdx.choosen.model}</div>
                    <div>Nivel de estado de uso: {detailRdx.choosen.state}</div>
                    <div>Precio: {detailRdx.choosen.price} €€</div>
                    {detailUsr.userPass.token !== '' && (
                        <div onClick={Sale} className='saleDesign'>Comprar</div>
                    )}

                </div>
            )}
        </div>
    );
};