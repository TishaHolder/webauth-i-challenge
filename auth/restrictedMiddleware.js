//server uses this middleware to verify credentials before providing access to any of our endpoints

//import bcrypt
const bcrypt = require ('bcrypt');

//import data access file
const userDB = require('../users/userModel.js');

function restricted (req, res, next){
    //we are using this middleware on a get endpoint so we cant read data from the request body
    //so we have to read information from the headers instead

    //destructure username and password
    const { username, password } = req.headers;

    //if the user provided a username and password
    if(username && password){
        userDB.findByUserName({ username }) //look up the username using the findByUserName function
        .first() //return the user object with the array square brackets removed
        .then(user => {
            //if a user was found and the entered password matches the stored password
            if(user && bcrypt.compareSync(password, user.password)){ 

                //return a status 200 and the user object (id, first name, last name, and username)
                //res.status(200).json(user);

                //we want to hit the endpoint if credentials are correct
                next();
            }
            else {
                //if the user wasn't found or the passwords didn't match display the following message
                res.status(401).json({ message: 'Invalid Credentials!'});
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'There was an error finding the user in the database.'})
        })
    }//if a username and password wasn't provided
    else {
        res.status(401).json({ message: 'Please provide valid credentials!'});
    }

}

//export the restricted function
module.exports = restricted;