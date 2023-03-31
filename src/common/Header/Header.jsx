import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.scss';
import inicio from '../../assets/home.jpg';
import { useSelector, useDispatch } from "react-redux";
import { userData, logout } from "../../pages/User/userSlice";
import { bikeData, select, find, clear } from '../../pages/bikeSlice';

//import { InputText } from '../InputText/InputText';
import { getSearch } from '../../services/apiCalls';

export const Header = () => {

    const dispatch = useDispatch();
    const initial = {
        token: '',
        user: {}
    }

    const [search, setSearch] = useState([]);
    const datosReduxUsuario = useSelector(userData);
    const datosReduxBikes=useSelector(bikeData);

        useEffect(() => {

            if (search !== "") {
                getSearch(search)
                    .then(
                        resultado => {
                            dispatch(find({ bikes: resultado.data }))
                        }
                    )
                    .catch(error => console.log(error));
            } else if (search === "" && datosReduxBikes.bikes.length > 0) {
                dispatch(clear({ choosen: {}, bikes: [] }));
            }

        }, [search])

    const navigate = useNavigate();

    const logOff = () => {
        dispatch(logout({ userPass: initial }))
        navigate("/")
    }

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    const resetHome = () => {
        dispatch(clear({ choosen: {}, bikes: [] }));
        navigate("/")
    }

    const searchErrorHandler = (e) => {
        console.log(e,"no se encontró nada");
    }

    return (
        <div className='headerDesign col-xs-12 col-sm-4 col-md-4 col-lg-4'>

            {/* <div onClick={() => ResetHome()} className='logoDesignHeader'><img id="logoHome" className='cameraAvatar' src={Logo} alt="Camara" /></div>
            <div className='searchDesign'>
                <InputText
                    type={"text"}
                    name={"search"}
                    className={'inputDesign'}
                    placeholder={"Introduce la busqueda"}
                    functionHandler={handleSearch}
                    errorHandler={searchErrorHandler}
                />
            </div> */}
             <div onClick={() => resetHome()} className='logoDesignHeader '><img className='inicio' src={inicio} alt="inicio" /></div>
            <div className='headerLinksDesign '>
                {datosReduxUsuario.userPass.rol === "admin" &&
                    <div onClick={() => navigate("/admin")} className='linkDesign '>admin</div>
                }
                {datosReduxUsuario.userPass.token !== "" ?
                    (<>
                        <div onClick={() => navigate("/profile")} className='linkDesign ' >{datosReduxUsuario.userPass?.name}</div>
                        <div className='linkDesign ' onClick={() => logOff()}>logout</div>
                    </>)
                    : (
                        <>
                            <div className='linkDesign col-xs-12 col-sm-4 col-md-4 col-lg-4' onClick={() => setTimeout(() => { navigate("/login") }, 200)}>login</div>
                            <div className='linkDesign col-xs-12 col-sm-4 col-md-4 col-lg-4' onClick={() => setTimeout(() => { navigate("/register") }, 200)}>register</div>
                        </>
                    )
                }
            </div>
        </div>
    );
};

