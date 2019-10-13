//import express
const express = require('express');

//import database developmet object
const db = require('../data/dbConfig.js');

//export CRUD methods
module.exports = {
    add, //register
    findByUserName, //login
    find, //after login return all the users
    findById


};

/*****************************************define CRUD methods********************************/

function add({first_name, last_name, username, password}){

    return db('users')
    .insert({first_name, last_name, username, password})
    .then ( ([id]) => {
        return findById(id);
    })

}

//because username and password was destructured in the router method
//it has to be include in curly brackets here
function findByUserName({ username }) { 

    return db('users')    
    .where({ 'users.username': username })
    .first();  

}

function find(){

    return db('users'); 


}

function findById(id){

    return db('users')
    .where({ 'users.id': id })
    .first();

    
}


