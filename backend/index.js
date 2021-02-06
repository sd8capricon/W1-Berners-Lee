require('dotenv').config()

const mongoose=require('mongoose');
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true }).catch((err)=console.log("Error Connecting to MongoDB"));

const express= require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');
const medicalRoutes = require('./routes/medicalRoutes');
const insuranceRoutes = require('./routes/insuranceRoutes');

const PORT = process.env.PORT || 5000;
const app = express();
//i know cors is enable for all web ik its dumb
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/user', authRoutes);
app.use('/game', gameRoutes);
app.use('/medical', medicalRoutes);
app.use('/insurances', insuranceRoutes);

app.listen(PORT, ()=>{
    console.log('Server listening on port '+PORT);
});