
const catagoryDatalayer = require('../datalayes/catagoryDatalayer')

exports.detail = (req,res)=>{
      catagoryDatalayer.detail().then((data)=>{
          res.json({
              message:'Here your Required Data',
              date:Date.now(),
              data:data
          })
      }).catch((err)=>{
          res.json({
              message:'There is some Problem ',
              date:Date.now()
          })
      })
};



exports.create = function(req,res){
    var param = req.body;
    catagoryDatalayer.create(param).then((data)=>{
        res.json({
            message:"Data Created Succesfully",
            date:Date.now(),
            data:data
        }).catch((err)=>{
            res.json({
                message:`Data Not Inserted`
            });
        });
    });
};




exports.delete = (req,res)=>{
    var para = req.params;
    catagoryDatalayer.delete(para.id).then((data)=>{
        res.json({
            message:"Your Data Deleted Succesfully",
            date:Date.now(),
            data:data
        })
    })
}

exports.update =(req,res)=>{
    var id = '5f4df968681eb21ab8a3d10e';
    var param = req.body;
    catagoryDatalayer.update(id,param).then((data)=>{
        res.json({
            message:"Your Data Inserted Succesfully",
            data:data,
            newData:param
        })
    }).catch((err)=>{
        res.send(err);
    })

   
}