const axios = require("axios");
const { host, version } = require("../Host");

const getStationList = (req, res) => {
    console.log('getStationList', req.params)
    return axios.get(`${host}${version}/saccoStation/list?saccoId=${req.params.id}`, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + req.headers.authorization } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}

const editStation = (req, res) => {
    console.log('editStation', req.body)
    return axios.put(`${host}${version}/saccoStation/edit`, req.body, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + req.headers.authorization } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}
const toggleStatus = (req, res) => {
    console.log('toggleStatus', req.body)
    return axios.put(`${host}${version}/saccoStation/toggleStatus`, req.body, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + req.headers.authorization } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}

const createStation = (req, res) => {
    console.log('createStation', req.body)
    return axios.post(`${host}${version}/saccoStation/create`, req.body, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + req.headers.authorization } })
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
    getStationList,
    editStation,
    toggleStatus,
    createStation
}