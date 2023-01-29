const axios = require("axios");
const { host, version } = require("../Host");

const createSacco = (req, res) => {
    console.log('create sacco', req.body)
    return axios.post(`${host}${version}/sacco`, req.body, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + req.headers.authorization } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}

const getSaccoById = (req, res) => {
    console.log('getSaccoById', req.params)
    return axios.get(`${host}${version}/sacco/${req.params.id}`, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + req.headers.authorization } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}
const CreateOfficial = (req, res) => {
    console.log('addOfficial', req.body)
    return axios.post(`${host}${version}/sacco/addOfficial`, req.body, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + req.headers.authorization } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}


const getSaccoList = (req, res) => {
    const { offset, pageSize } = req.params
    console.log('get sacco list', req.headers.authorization)
    return axios.get(`${host}${version}/sacco?offset=${offset}&pageSize=${pageSize}`, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + req.headers.authorization } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}


const UpdateOfficial = (req, res) => {
    console.log('update sacco', req.body)
    return axios.put(`${host}${version}/sacco/official`, req.body, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + req.headers.authorization } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}

const UpdateOfficialStatus = (req, res) => {
    console.log('update sacco', req.body)
    return axios.put(`${host}${version}/sacco/official/status`, req.body, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + req.headers.authorization } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}

const UpdateSacco = (req, res) => {
    console.log('update sacco', req.body)
    return axios.put(`${host}${version}/sacco`, req.body, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + req.headers.authorization } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}

const getOfficialList = (req, res) => {
    console.log('getOfficialList', req.params)
    return axios.get(`${host}${version}/sacco/official/list?saccoId=${req.params.saccoId}&saccoStationId=${req.params.saccoStationId}`, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + req.headers.authorization } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}

const updateStation = (req, res) => {
    console.log('station sacco', req.body)

    return axios.put(`${host}${version}/sacco/official/station`, req.body, { headers: { "Content-Type": "application/json" } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}

const createCharge = (req, res) => {
    console.log('create charge', req.body)
    return axios.post(`${host}${version}/sacco/charge`, req.body, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + req.headers.authorization } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}

const updateCharge = (req, res) => {
    console.log('create charge', req.body)
    return axios.put(`${host}${version}/sacco/charge`, req.body, { headers: { "Content-Type": "application/json" } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}

const createBalance = (req, res) => {
    console.log('create balance', req.body)
    return axios.post(`${host}${version}/sacco/balance`, req.body, { headers: { "Content-Type": "application/json" } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}
const updateSaccoStatus = (req, res) => {
    console.log('updateSaccoStatus', req.body)
    return axios.put(`${host}${version}/sacco/status`, req.body, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + req.headers.authorization } })
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
    createSacco,
    UpdateOfficial,
    CreateOfficial,
    getOfficialList,
    updateStation,
    createCharge,
    updateCharge,
    createBalance,
    getSaccoList,
    UpdateSacco,
    getSaccoById,
    UpdateOfficialStatus,
    updateSaccoStatus
}