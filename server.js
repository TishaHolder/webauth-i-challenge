//import express
const express = require('express');

//import session - to add session support to our express API
const session = require('express-session');

const KnexSessionStore = require('connect-session-knex')(session); // <<<< for storing sessions in db

//import router
const userRouter = require('./users/userRouter.js');

//configure knexConfig object
const knexConfig = require('./data/dbConfig.js');

//create server application
const server = express();

//create config object for the session
const sessionConfig = {
    name: 'user', //default name is sid
    //use to encrypt and decrypt the cookie
    //use an environment variable for this, it should be dynamic, not hard coded
    secret: 'safeword',
    cookie: {
        //how long session is going to be valid for: 1 second(1000 milliseconds) * 30 = 30 seconds. expire after 30 seconds
        maxAge: 1000 * 30, //1 hour = (1000 * 60 * 60)
        //can i send over an unencrypted connection or over HTTP - should be true in production
        //false during development
        //could be secure: process.env.NODE_ENV === production ? true : false
        secure: false, //use cookie over HTTPS only
        httpOnly: true, //this cookie cannot be accessed from javascript
    },

    //do we want to recreate a session even if it hasn't changed   
    resave: false, 
    
     //need to dynamically change - GDPR laws against setting cookies automatically
    //should only be true once a user has opted in to let us save cookies
    saveUninitialized: false, 

     // change to use our database instead of memory to save the sessions
    store: new KnexSessionStore({
        knex: knexConfig,
        createtable: true, // automatically create the sessions table
        clearInterval: 1000 * 60 * 30, // delete expired sessions every 30
  }),

};

//mount global middleware
server.use(express.json());
server.use(session(sessionConfig));

//global get request
server.get('/', (req, res) => {
    res.send(`<h2>Web Auth I Challenge!</h2>`)
});

//mount user router
server.use('/', userRouter);

//export server
module.exports = server;