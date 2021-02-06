require('dotenv').config()
const express= require('express');
const mongoose=require('mongoose');
const authRoutes = require('./routes/authRoutes');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

try {
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });
    console.log('connected to mongoDB');
} catch (err) {
    console.log('error connecting to mongoDB');
}

//routes
app.use('/user', authRoutes)

app.listen(PORT, ()=>{
    console.log('Server listening on port '+PORT);
});