const userModel = require('../../modules/User');


exports.detail = function(){
    return new Promise((res,rej)=>{
        userModel.find().then((data)=>{
            res(data);
        }).catch((err)=>{
            rej(err);
        })
    });

};


exports.create = function(param){
    return new Promise((res,rej)=>{
        userModel.create(param).then((data)=>{
            res(data);
        }).catch((err)=>{
            rej(err);
        });
    });
};


exports.delete = function(para){
    return new Promise((res,rej)=>{
        userModel.findByIdAndDelete(para).then((data)=>{
            res(data);
        }).catch((err)=>{
            rej(err);
        });
    });
};

exports.update = function(id,para){
    return new Promise((res,rej)=>{
        userModel.findByIdAndUpdate(id,para).then((data)=>{
            res(data);
        }).catch((err)=>{
            rej(err);
        });
    });
};



