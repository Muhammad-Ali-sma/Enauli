import { url } from "../Utils/Host";
import RestClient from "../Utils/RestClient";


const login = (data) => RestClient.Post(`${url}/user/login`, data);

const changePassword = (data) => RestClient.Put(`${url}/user/changePassword`, data);

const resetPassword = (data) => RestClient.Put(`${url}/user/resetPassword`, data);

const getOtp = (code) => RestClient.Get(`${url}/user/verificationCode/${code}`);

const verifyOtp = (data) => RestClient.Post(`${url}/user/code/verify`, data);

const changePin = (data) => RestClient.Put(`${url}/user/changePin`, data);

const resetPin = (data) => RestClient.Put(`${url}/user/resetPin`, data);

export { login, changePassword, resetPassword, getOtp, verifyOtp, changePin, resetPin };