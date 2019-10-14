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

    //destructure the info received from req.body
    const { first_name, last_name, username, password } = req.body;

    //hash the password. 8 indicates hashing rounds
    //Having an algorithm that hashes the information multiple times (rounds) means an attacker needs to 
    //have the hash, know the algorithm used, and how many rounds were used to generate the hash in the first place.
    const hash = bcrypt.hashSync(password, 8);

    userDB.add({ first_name, last_name, username, password: hash})
    .then(user => {
        res.status(200).json(user);
    })
    .catch(error => {
        console.log("reg error", error);
        res.status(500).json({ error: 'There was a registration error.'})
    })
    

})

userRouter.post('/api/login', (req, res) => {

    const { username, password } = req.body;

    userDB.findByUserName({ username })    
    .then(user => {             
        //check that passwords match
        if(user && bcrypt.compareSync(password, user.password)){
            //set session information
            //our req object is going to have a sesion property 
            //and in this object we can place any property that we want (req.session)            
            //on successful login we place the user inside of the session
            req.session.user = user;

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

userRouter.get('/api/users', restricted, (req, res) => {

    userDB.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({ error: 'There was an error retrieving the users from the database.' })

    })
})

userRouter.get('/api/restricted', restricted, (req, res) => {

    userDB.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(error => {
        res.status(500).json({ error: 'There was an error retrieving the users from the database.'})
    })

})

userRouter.get('/api/logout', (req, res) => {
    if(req.session){
        req.session.destroy(err => {
            if(err){
                res.json({ message: 'There was an error logging you out!'})
            }
            else{
                res.status(200).json({ message: 'See you again soon....Thanks for stoppying by!'})
            }
        })
    }
    else {
        res.status(200).json({ message: 'Your are not currently logged in!'})
    }
})

//export router
module.exports = userRouter;