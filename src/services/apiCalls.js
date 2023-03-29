
import axios from 'axios';
const root = 'http://localhost:5700/';

export const getBikes = async () => {
    return await axios.get(`${root}bikes/`);
};

export const postLogin = async (credenciales) => {
    return await axios.post(`${root}users/login`, credenciales);
};

export const postRegistered = async (body) => {
    return await axios.post(`${root}users/newUser`, body)
}

export const getSearch = async (criterioBusqueda) => {
    return await axios.get(`${root}users/getAllUsers?user=${criterioBusqueda}`);
}

export const allUsersAdmin = async (token) => {

    let config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    return await axios.get(`${root}users/getAll`, config);

};

export const getBySales = async (token, id) => {

    let config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    return await axios.get(`${root}sales/BySales/${_id}`, config);
};

export const postRent= async (body, token) => {

    // let config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };
    return await axios.post(`${root}rentals/newRental`, body, config);
};

export const postSale= async (body, token) => {

    let config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    return await axios.post(`${root}sales/newSale`, body, config);
};

// export const allUsersAdmin = async (token) => {
//     let config = {
//         headers: { 
//             'Authorization': 'Bearer ' + token
//           }
//     }
//     return await axios.get(`${root}rentals/getAll`, config);
// }

// export const allSales = async (token, id) => {

//     let config = {
//         headers: { Authorization: `Bearer ${token}` },
//     };
//     return await axios.get(`${root}sales/userSales/${id}`, config);

// };