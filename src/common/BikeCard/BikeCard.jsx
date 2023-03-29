
import React from 'react';
import './BikeCard.scss';

export const BikeCard= ({bike}) => {
    
    return (
        <div className='cardBikeDesign'>
            <div className='cardBikeDesign'>{bike.model !== '' ? bike.model : "Nombre no disponible"}</div>
            <div><img className='posterDesign' src={`${bike.img}`} /></div>
            {/* <div><img className='posterDesign' src={`${poster_default}${serie.poster_path}`}/></div> */}
        </div>
    )
}