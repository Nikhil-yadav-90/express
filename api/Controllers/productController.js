const productDatalayer = require('../datalayes/productDatalayer');

exports.detail = (req,res)=>{
    productDatalayer.detail().then((doc)=>{
        res.json({
            message:'Success',
            date:Date.now(),
            data:doc
        });
    }).catch((err)=>{
        res.json({
            message:'Something Went Wrong',
            status:404,
            error:err
        });
    }); 
};


exports.create = function(req,res){
    console.log(req.file.path);
    console.log(req.body); 
    var param = {
        productName:req.body.productName,
        quantity:req.body.quantity,
        productImage:req.file.path,
        userID:req.body.userID
    }  
    // param = req.body;
    productDatalayer.create(param).then((doc)=>{
        res.json({
            message:"Product List Created Succesfully",
            date:Date.now(),
            dataCreated:doc
        })
    }).catch((err)=>{
        res.json({
            message:'Product Doesnot created',
            error:err,
        });
    });
    

    res.send(req.body);
};