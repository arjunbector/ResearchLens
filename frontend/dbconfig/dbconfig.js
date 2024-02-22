// src/dbconfig/dbconfig.js
/*
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        });

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
    }
}

module.exports = { connect }; // Export the connect function
*/

import mongoose from "mongoose";

let isConnected=false

export const connectToDB=async()=>{
    mongoose.set('strictQuery',true)

    if(isConnected){
        console.log("Mongo is already connected")
        return
    }

    try{
        await mongoose.connect(process.env.MONGO_URI)

        isConnected=true
        console.log("connected to mongodb")
    }
    catch(e){
        console.log(e)
    }



}