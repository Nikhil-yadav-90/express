const passModel = require('../../modules/addPassword');




exports.find = function(param){
    return new Promise((res,rej)=>{
        if(typeof param=='undefined'){
            passModel.find().then((data)=>{
                res(data);
            }).catch((err)=>{
                rej(err);
            })
        }
        passModel.find(param).then((data)=>{
            res(data);
        }).catch((err)=>{
            rej(err);
        });
    });
};



exports.create = function(param){
    return new Promise((res,rej)=>{
        passModel.create(param).then((data)=>{
            res(data);
        }).catch((err)=>{
            rej(err);
        });
    });
};

exports.delete = function(param){
    return new Promise((res,rej)=>{
        passModel.findByIdAndDelete(param.id).then((data)=>{
            res(data);
        }).catch((err)=>{
            rej(err);
        })
    });
};

exports.update = function(id,param){
    // console.log(id,param);
    return new Promise((res,rej)=>{
        passModel.findByIdAndUpdate(id,param).then((data)=>{
            res(data);
        }).catch((err)=>{
            rej(err);
        });

    });
};





