import axios from 'axios';

const Get = async (host) => {
const Token = localStorage.getItem("Token")

    return axios.get(host, { headers: { 'Authorization': Token ? Token : '' } })
        .then(({ data }) => {
            return data;
        })
        .catch(async (error) => {
            return null;
        });
}

const Post = async (host, data) => {
const Token = localStorage.getItem("Token")

    return axios.post(host, data, { headers: { 'Authorization': Token ? Token : '' } })
        .then(({ data }) => {
            return data;
        })
        .catch((error) => {
            return {
                success: false,
                error
            };
        });
}

const Put = async (host, data) => {
const Token = localStorage.getItem("Token")

    return axios.put(host, data, { headers: { 'Authorization': Token ? Token : '' } })
        .then(({ data }) => {
            return data;
        })
        .catch((error) => {
            return {
                success: false,
                error
            };
        });
}



export default { Get, Post, Put };