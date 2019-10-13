//import express
const express = require('express');

//create router
const userRouter = express.Router();

//import bcrypt
const bcrypt = require ('bcrypt');

//import restricted middleware
const restricted = require('../auth/restrictedMiddleware.js');

//import data access file
const userDB = require('./userModel.js');

/*************************************endpoints**********************************/
userRouter.post('/api/register', (req, res) => {

    const { first_name, last_name, username, password } = req.body;

    const hash = bcrypt.hashSync(password);

    userDB.add({ first_name, last_name, username, password: hash})
    .then(id => {
        res.status(200).json(id);
    })
    .catch(error => {
        res.status(500).json({ error: 'There was a registration error.'})
    })
    

})

userRouter.post('/api/login', (req, res) => {

    const { username, password } = req.body;

    userDB.findByUserName({ username })    
    .then(user => {             
        //check that passwords match
        if(user && bcrypt.compareSync(password, user.password)){
            res.status(200).json(user);
        }
        else {
            // we will return 401 if the password or username are invalid
            // we don't want to let attackers know when they have a good username
            res.status(401).json({ message: 'Invalid Credentials!'});
        }
    })
    .catch(error => {
        console.log("log in error", error);
        res.status(500).json({ error: 'There was an error signing the user into the database.'});
    })
})

userRouter.get('/api/users', (req, res) => {

    userDB.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({ error: 'There was an error retrieving the users from the database.' })

    })
})

//export router
module.exports = userRouter;