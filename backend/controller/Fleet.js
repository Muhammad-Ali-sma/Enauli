const { host, version } = require("../Host");
const axios = require("axios");

const createVehicle = (req, res) => {
    console.log('create vehicle', req.body)
    return axios.post(`${host}${version}/vehicle`, req.body, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + req.headers.authorization } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}

const getVehicle = (req, res) => {
    console.log('getVehicle', req.params);

    return axios.get(`${host}${version}/vehicle?saccoId=${req.params.id}`, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + req.headers.authorization } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}
const updateVehicle = (req, res) => {
    console.log('put vehicle', req.body)
    return axios.put(`${host}${version}/vehicle`, req.body, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + req.headers.authorization } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}

const addOperator = (req, res) => {
    console.log('create addOperator', req.body)
    return axios.post(`${host}${version}/vehicle/addOperator`, req.body, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + req.headers.authorization } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}

const updateOperator = (req, res) => {
    console.log('updateOperator', req.body)
    return axios.put(`${host}${version}/vehicle/operator`, req.body, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + req.headers.authorization } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}

const getOperator = (req, res) => {
    console.log('getOperator', req.params)
    return axios.get(`${host}${version}/vehicle/operators?vehicleId=${req.params.id}`, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + req.headers.authorization } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}

module.exports = {
    createVehicle,
    updateVehicle,
    addOperator,
    updateOperator,
    getVehicle,
    getOperator
}