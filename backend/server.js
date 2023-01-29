const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/User');
const saccoRoutes = require('./routes/Sacco');
const stationRoutes = require('./routes/Station');
const fleetRoutes = require('./routes/Fleet');


//Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// USER
app.use('/v1/user', userRoutes);

// SACCO
app.use('/v1/sacco', saccoRoutes);

// STATION
app.use('/v1/saccoStation', stationRoutes);

//Fleet management
app.use('/v1/vehicle', fleetRoutes)


app.listen(5000);