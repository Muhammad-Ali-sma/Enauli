import { url } from "../Utils/Host";
import RestClient from "../Utils/RestClient";


const createVehicle = (data) => RestClient.Post(`${url}/vehicle/`, data);

const updateVehicle = (data) => RestClient.Put(`${url}/vehicle/`, data);

const addOperator = (data) => RestClient.Post(`${url}/vehicle/addOperator`, data);

const updateOperator = (data) => RestClient.Put(`${url}/vehicle/operator`, data);

const getVehicleById = (id) => RestClient.Get(`${url}/vehicle/${id}`);

const GetOperators = (id) => RestClient.Get(`${url}/vehicle/operators/${id}`);



export { createVehicle, updateVehicle,addOperator, updateOperator, getVehicleById,GetOperators };