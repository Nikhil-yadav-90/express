const addPassModel = require('../../modules/addPassword');


exports.detail = ()=>{
    return new Promise((res,rej)=>{
        addPassModel.find().populate('userID'/** this is field name of parent Schema */,"username email").then((data)=>{
            res(data);
        }).catch((err)=>{
            rej(err);
        });
    });
};