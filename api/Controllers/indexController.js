const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();

router.get('/',function(req,res){
  
    res.status(200).json({
        message:"Welcome To The API",
        status:200,
        data:''
    })
})


module.exports = router;