const express = require("express");
const router = express.Router();
const passWordDataLayer = require("../datalayes/passwordDatalayer");

exports.detail = function (req, res, next) {
  var param = req.query;
//   console.log(param)
  passWordDataLayer.find(param).then((doc) => {
    console.log(doc);
    res.json({
      status: 200,
      date: Date.now(),
      data: doc,
    });
  });
};


exports.create = function(req,res,next){
    var param = req.body;
    console.log(param);
    passWordDataLayer.create(param).then((doc)=>{
        res.json({
            status:200,
            message:'Data Inserted Succesfully',
            data:doc,
            date:Date.now()
        })
    }).catch((err)=>{
        res.json({
            status:404,
            message:"Data Inserted Should be unique "
        })
    })
}


exports.delete = function(req,res,next){
    param = req.params;
    console.log(param);
    passWordDataLayer.delete(param).then((data)=>{
        res.json({
            status:200,
            message:'Data Deleted Succesfully',
            Deleted_ID:param,
            Deleted_data:data
        });
    });
}


exports.update = function(req,res,next){
    var param = req.body;
    var id = '5f4cd9de2532ce505c6aeb9d';
    passWordDataLayer.update(id,param).then((data)=>{
        res.json({
            message:"data updated Succesfully",
            id:id,
            date:Date.now(),
            updatedData:data

        }).catch((err)=>{
            res.json({
                message:"Error Occured",
                err:err
            })
        })
    })
    // res.send("This is from Controller ");
}