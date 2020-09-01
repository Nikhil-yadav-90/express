const experimentDatalayers = require('../../api/datalayes/experimentDatalayers');




exports.detail = function(req,res){
    experimentDatalayers.detail().then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.send(err);
    })
}