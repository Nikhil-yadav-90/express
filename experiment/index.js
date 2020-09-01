const mongoose = require('mongoose');


const userModel = require('../modules/User')


async function myFunction(){
 var user = 'Nikhil Yadav';
 let chckExistsUser = await userModel.find({username:user});
 console.log(chckExistsUser);
    
 }

myFunction();