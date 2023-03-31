import React, { useState, useEffect } from 'react';
import './Home.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { BikeCard } from '../../common/BikeCard/BikeCard';
import { bikeData, select } from '../bikeSlice';
import { getBikes } from '../../services/apiCalls';


export const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [bikes, setBikes] = useState([]);
    const datosReduxBikes = useSelector(bikeData)

    useEffect(() => {
        if (bikes.length === 0) {
            setTimeout(() => {
                getBikes()
                    .then(
                        resultado => {
                            setBikes(resultado.data);
                        }
                    )
                    .catch(error => console.log(error));
            }, 1000);
        };
    }, [bikes]);

    const Choosen = (bike) => {
        dispatch(select({ choosen: bike }))
        setTimeout(() => {
            navigate("/BikeDetail");
        }, 250);
    }
   

    return (
        <div className='homeDesign'>
            {datosReduxBikes.bikes.length > 0 ? (
                <div className='rosterDesign'>
                    {datosReduxBikes.bikes.map(
                        bike => {
                            return (
                                <div onClick={() => Choosen(bike)} key={bike._id}>
                                    <BikeCard bike={bike} />
                                </div>
                            )
                        }
                    )}
                </div>
            ) :
                (
                    bikes.length > 0 ? (
                        <div className='rosterDesign'>
                            {bikes.map(
                                bike => {
                                    return (
                                        <div onClick={() => Choosen(bike)} key={bike._id}>
                                            <BikeCard bike={bike} />
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    ) : (
                        <div></div>
                    )
                )
            }
            
        </div>
        
    );
 };