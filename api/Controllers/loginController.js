const express = require('express');
const loginDatalayes = require('../datalayes/loginDatalayer');
const { param } = require('../../routes/api');

exports.detail = function(req,res,next){
            params = req.query;
            console.log(params);
            loginDatalayes.detail().then((data)=>{
                res.send(data);
            }).catch((err)=>{
                res.send(err);
            });
        //    res.send(params)
};

exports.create = function(req,res){
    var para = req.body;
    loginDatalayes.create(para).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.send(err);
    });


};

exports.delete = function(req,res){
    var para = req.params;
    console.log(para);
    loginDatalayes.delete(para.id).then((data)=>{
        res.json({
            message:`Data Deleted Succesfully of id:${para.id}`,
            data:data,
            date:Date.now()
        })
    }).catch((err)=>{

        res.json({            
        message:"Data Not Found Of particular ID",
        date:Date.now()
        })
    })
    // res.send(para)
}


exports.update = function(req,res){
    var para = req.body;
    var id = '5f41441af8f87e5128c7b26f';
    loginDatalayes.update(id,para).then((data)=>{
        res.json({
            message:"Data Updated Succesfully",
            Previous_data:data,
            date:Date.now()
        })
    }).catch((err)=>{
        res.json({
            message:err
        });
    })

}
