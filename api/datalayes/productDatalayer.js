const productModel = require('../../modules/addProduct');


exports.detail = function(){
    return new Promise((res,rej)=>{
        productModel.find().populate('userID').then((doc)=>{
            res(doc);
        }).catch((err)=>{
            rej(err);
        });
    });
};

exports.create = (param)=>{
    return new Promise((res,rej)=>{
        productModel.create(param).then((doc)=>{
            res(doc);
        }).catch((err)=>{
            rej(err);
        });
    });
};