const axios = require("axios");
const { host, version } = require("../Host");


const Authenticate = (req, res) => {
    const key = {
        "apiKey": "3ce56b08-a3ab-4f71-8124-8f577c80b78e",
        "appSecret": "1F7C8BC2357640E182BAAAC5212DE545"
    }
    return axios.post(`${host}${version}/auth/token`, key, { headers: { "Content-Type": "application/json" } })
        .then(res => {
            return res.data.data[0].accessToken;
        })
        .catch(err => {
            return res.json({ success: false, err });
        })
}
const Login = async (req, res) => {
    let Token = req.headers.authorization;
    if (!req.headers.authorization) {
        Token = await Authenticate(req, res);
    }
    console.log(req.headers.authorization, "Login", Token)

    return axios.post(`${host}${version}/user/login`, req.body, {
        headers: {
            "Content-Type": "application/json", "Authorization": "Bearer " + Token
        }
    })
        .then(response => {
            console.log(response.data);
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data.data[0] });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}

const ChangePassword = (req, res) => {
    console.log(req.headers.authorization, 'changePassword', req.body)
    return axios.put(`${host}${version}/user/changePassword`, req.body, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + req.headers.authorization } })
        .then(res => {
            console.log(res.data.data)
            return res;
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}

const ChangePin = (req, res) => {
    console.log(req.headers.authorization, 'ChangePin', req.body)
    return axios.put(`${host}${version}/user/changePin`, req.body, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + req.headers.authorization } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}

const ResetPin = async(req, res) => {
    console.log(req.headers.authorization, 'ResetPin', req.body)
    let Token = req.headers.authorization;
    if (!req.headers.authorization) {
        Token = await Authenticate(req, res);
    }
    return axios.put(`${host}${version}/user/resetPin`, req.body, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + Token } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}
const getOtp = async (req, res) => {
    console.log('verificationCode', req.params)
    let Token = req.headers.authorization;
    if (!req.headers.authorization) {
        Token = await Authenticate(req, res);
    }
    return axios.get(`${host}${version}/user/verificationCode/${req.params.code}`, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + Token } })
        .then(response => {
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });

        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}

const VerifyOtp = async (req, res) => {
    console.log('VerifyOtp', req.body)

    let Token = req.headers.authorization;
    if (!req.headers.authorization) {
        Token = await Authenticate(req, res);
    }
    return axios.post(`${host}${version}/user/code/verify`, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + Token } })
        .then(response => {
            console.log(response.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}

const ResetPassword = async (req, res) => {
    console.log('resetPassword', req.body)
    let Token = req.headers.authorization;
    if (!req.headers.authorization) {
        Token = await Authenticate(req, res);
    }
    return axios.put(`${host}${version}/user/resetPassword`, req.body, { headers: { "Content-Type": "application/json", "Authorization": "Bearer " + Token } })
        .then(res => {
            console.log(response.data.data)
            return res.status(Number(response.data.status.code)).json({ success: true, data: response.data });
        })
        .catch(err => {
            console.log(err);
            return res.json({ success: false, err });
        })
}


module.exports = {
    Login,
    ChangePassword,
    ResetPassword,
    getOtp,
    VerifyOtp,
    ChangePin,
    ResetPin
}