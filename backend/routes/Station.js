const express = require('express');
const { getStationList, editStation, toggleStatus, createStation } = require('../controller/Station');

const router = express.Router();

router.get('/:id', getStationList)

router.put('/edit', editStation)

router.put('/', toggleStatus)

router.post('/create', createStation)


module.exports = router;