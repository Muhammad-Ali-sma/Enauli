import { url } from "../Utils/Host";
import RestClient from "../Utils/RestClient";


const createSacco = (data) => RestClient.Post(`${url}/sacco/`, data);

const getSaccoList = (offset, pageSize) => RestClient.Get(`${url}/sacco/${offset}/${pageSize}`);

const addOfficial = (data) => RestClient.Post(`${url}/sacco/addOfficial`, data);

const UpdateSacco = (data) => RestClient.Put(`${url}/sacco/`, data);

const UpdateOfficial = (data) => RestClient.Put(`${url}/sacco/official`, data);

const UpdateOfficialStatus = (data) => RestClient.Put(`${url}/sacco/official/status`, data);

const updateOperator = (data) => RestClient.Put(`${url}/sacco/operator`, data);

const getOfficialList = (saccoId, saccoStationId, userId, designation, isActive) => RestClient.Get(`${url}/sacco/official/list/${saccoId}/${saccoStationId}`);

const updateStation = (data) => RestClient.Put(`${url}/sacco/official/station`, data);

const createCharge = (data) => RestClient.Post(`${url}/sacco/charge`, data);

const updateCharge = (data) => RestClient.Put(`${url}/sacco/charge`, data);

const createBalance = (data) => RestClient.Post(`${url}/sacco/balance`, data);

const getSaccoById = (id) => RestClient.Get(`${url}/sacco/${id}`);

const getStationList = (id) => RestClient.Get(`${url}/saccoStation/${id}`);

const toggleStationStatus = (data) => RestClient.Put(`${url}/saccoStation/`, data);

const editStation = (data) => RestClient.Put(`${url}/saccoStation/edit`, data);

const createStation = (data) => RestClient.Post(`${url}/saccoStation/create`, data);

const updateSaccoStatus = (data) => RestClient.Put(`${url}/sacco/status`, data);


export { createSacco, addOfficial, UpdateSacco, updateOperator, getOfficialList, updateStation, createCharge, updateCharge, createBalance, getSaccoList, UpdateOfficial, getSaccoById, getStationList, toggleStationStatus, editStation, createStation,UpdateOfficialStatus,updateSaccoStatus };