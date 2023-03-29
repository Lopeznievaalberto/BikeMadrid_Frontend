
import React from 'react';
import './SaleCard.scss';

export const SaleCard = ({ sale }) => {

    return (
        <div className='saleCardDesign'>
            <div>Datos venta</div>
            <div>Usuario: {sale.user_id !== '' ? sale.user_id : "user_id"}</div>
            <div>Bicicleta: {sale.bike_id !== '' ? sale.bike_id : "bike_id"}</div>
            <div>Precio: {sale.price !== '' ? sale.price : "precio"}</div>
        
        </div>
    )
}