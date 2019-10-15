//import express
const express = require('express');

//import server
const server = require('./server.js');

//set up dynamic port
const port = process.env.PORT || 6000;

server.listen(port, ()=> {
    console.log(`\n***Server Running on http://localhost:${port}***\n`);
})
