const express = require('express');
const { createSacco, UpdateOfficial, CreateOfficial, getOfficialList, createCharge, updateCharge, createBalance, updateStation, getSaccoList, UpdateSacco ,getSaccoById, UpdateOfficialStatus, updateSaccoStatus} = require('../controller/Sacco');

const router = express.Router();

router.get('/:offset/:pageSize', getSaccoList)

router.get('/:id', getSaccoById)

router.post('/', createSacco)

router.put('/', UpdateSacco)

router.post('/addOfficial', CreateOfficial)

router.put('/official', UpdateOfficial)

router.put('/official/status', UpdateOfficialStatus)

router.get('/official/list/:saccoId/:saccoStationId', getOfficialList)

router.put('/official/station', updateStation)

router.post('/charge', createCharge)

router.put('/charge', updateCharge)

router.post('/balance', createBalance)

router.put('/status', updateSaccoStatus)


module.exports = router;