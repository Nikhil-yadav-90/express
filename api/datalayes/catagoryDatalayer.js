const catagoryModel = require('../../modules/Password');


exports.detail = function(){
    return new Promise((res,rej)=>{
        catagoryModel.find().then((data)=>{
            res(data);
        }).catch((err)=>{
            rej(err);
        });
    });
};

exports.create = (param)=>{
    return new Promise((res,rej)=>{
        catagoryModel.create(param).then((data)=>{
            res(data);
        }).catch((err)=>{
            rej(err);
        });
    });
};

exports.delete = (para)=>{
return new Promise((res,rej)=>{
    catagoryModel.findByIdAndDelete(para).then((data)=>{
        res(data);
    }).catch((err)=>{
        rej(err);
    });
});
};

exports.update = (id,param)=>{
    return new Promise((res,rej)=>{
        catagoryModel.findByIdAndUpdate(id,param).then((data)=>{
            res(data);
        }).catch((err)=>{
            rej(err);
        })
    })
    }