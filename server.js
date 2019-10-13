//import express
const express = require('express');

//create server application
const server = express();

//mount global middleware
server.use(express.json());

//global get request
server.get('/', (req, res) => {
    res.send(`<h2>Web Auth I Challenge!</h2>`)
});


//import router
const userRouter = require('./users/userRouter.js');

//mount user router
server.use('/', userRouter);

//export server
module.exports = server;