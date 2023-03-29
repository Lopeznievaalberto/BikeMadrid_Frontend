import React, { useState, useEffect } from 'react';
import { InputText } from '../../../common/InputText/InputText';
import { postRegistered } from '../../../services/apiCalls';
import { errorCheck } from '../../../services/utiles';
import { useNavigate } from 'react-router-dom';
import './Register.scss';

export const Register = () => {
    const [usuario, setUsuario] = useState({
        name: '',
        password: '',
        email: '',
    })
    const [usuarioError, setUsuarioError] = useState({
        nameError: '',
        passwordError: '',
        emailError: '',
    })

    const navigate = useNavigate();
    const registerInputHandler = (e) => {
        setUsuario((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));;
    }

    const registerErrorHandler = (e) => {
        let error = '';
        error = errorCheck(e.target.name, e.target.value);
        setUsuarioError((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: error
        }));
    }

    const signMe = () => {
        postRegistered(usuario)
            .then(
                newUser => {
                    console.log(newUser)
                    setTimeout(() => {
                        navigate("/")
                    }, 1000);
                }
            )
            .catch(error => console.log(error));
    }

    return (
        <div className='registerDesign'>
            <p>Nombre</p>
            <InputText
                type={'text'}
                name={'name'}
                className={usuarioError.nameError === '' ? 'inputDesign' : 'inputDesign inputDesignError'}
                placeholder={'name'} functionHandler={registerInputHandler}
                errorHandler={registerErrorHandler}
            />
            <div className='Error name'>{usuarioError.nameError}</div>
            <p>Contraseña</p>
            <InputText
                type={'password'}
                name={'password'}
                className={usuarioError.passwordError === '' ? 'inputDesign' : 'inputDesign inputDesignError'}
                placeholder={'password'}
                functionHandler={registerInputHandler}
                errorHandler={registerErrorHandler}
            />
            <div className='Error password'>{usuarioError.passwordError}</div>
            <p>Email</p>
            <InputText
                type={'email'}
                name={'email'}
                className={usuarioError.emailError === '' ? 'inputDesign' : 'inputDesign inputDesignError'}
                placeholder={'email'}
                functionHandler={registerInputHandler}
                errorHandler={registerErrorHandler}
            />
            <div className='Error email'>{usuarioError.emailError}</div>
            <div className='loginButtonDesign' onClick={() => signMe()}>Sign in</div>
        </div>
    );
};