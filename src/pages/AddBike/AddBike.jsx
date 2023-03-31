import React, { useState, useEffect } from 'react';
import { InputText } from '../../common/InputText/InputText';
import { postAdd } from '../../services/apiCalls';
import { useNavigate } from 'react-router-dom';
import './AddBike.scss';

export const AddBike = () => {
    const [bike, setBike] = useState({
        brand: '',
        model: '',
        price: '',
    })
    const [bikeError, setBikeError] = useState({
        brandError: '',
        modelError: '',
        priceError: '',
    })

    const navigate = useNavigate();
    const registerInputHandler = (e) => {
        setBike((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));;
    }

    const registerErrorHandler = (e) => {
        let error = '';
        // error = errorCheck(e.target.name, e.target.value);
        setBikeError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error
        }));
    }

    const add = () => {
        postAdd(bike)
            .then(
                newBike => {
                    console.log(newBike)
                    setTimeout(() => {
                        navigate("/")
                    }, 1000);
                }
            )
            .catch(error => console.log(error));
    }

    return (
        <div className='registerDesign'>
            <p>Brand</p>
            <InputText
                type={'text'}
                name={'brand'}
                className={bikeError.brandError === '' ? 'inputDesign' : 'inputDesign inputDesignError'}
                placeholder={'brand'} functionHandler={registerInputHandler}
                errorHandler={registerErrorHandler}
            />
            <div className='Error name'>{bikeError.brandError}</div>
            <p>Model</p>
            <InputText
                type={'text'}
                name={'model'}
                className={bikeError.modelError === '' ? 'inputDesign' : 'inputDesign inputDesignError'}
                placeholder={'model'}
                functionHandler={registerInputHandler}
                errorHandler={registerErrorHandler}
            />
            <div className='Error password'>{bikeError.modelError}</div>
            <p>Price</p>
            <InputText
                type={'text'}
                name={'price'}
                className={bikeError.priceError === '' ? 'inputDesign' : 'inputDesign inputDesignError'}
                placeholder={'price'}
                functionHandler={registerInputHandler}
                errorHandler={registerErrorHandler}
            />
            <div className='Error email'>{bikeError.priceError}</div>
            <div className='add' onClick={() => add()}>Añadir</div>
        </div>
    );
};