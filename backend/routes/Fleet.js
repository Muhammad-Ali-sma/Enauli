const express = require('express');
const { createVehicle, updateVehicle, addOperator, updateOperator,getVehicle, getOperator } = require('../controller/Fleet');


const router = express.Router();

router.post('/', createVehicle)

router.put('/', updateVehicle)

router.post('/addOperator', addOperator)

router.put('/operator', updateOperator)

router.get('/:id', getVehicle)

router.get('/operators/:id', getOperator)


module.exports = router;