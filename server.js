//import express
const express = require('express');

//import session - to add session support to our express API
const session = require('express-session');

//create server application
const server = express();

//create config object for the session
const sessionConfig = {
    name: 'user', //default value is sid
    secret: 'safeword',//use to encrypt and decrypt the cookie
    cookie: {
        //how long session is going to be valid for: 1 second(1000 milliseconds) * 30 = 30 seconds. expire after 30 seconds
        maxAge: 1000 * 30, 
        secure: false, //can i send over an unencrypted connection or over HTTP - should be true in production
        httpOnly: true, //this cookie cannot be accessed from javascript
    },
    resave: false, //do we want to recreate a session even if it hasn't changed
    //need to dynamically change - GDPR laws against setting cookies automatically
    //should only be true once a user has opted in to let us save cookies
    saveUninitialized: false, 
};

//mount global middleware
server.use(express.json());
server.use(session(sessionConfig));

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