const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

 function token(){

    return new Promise((res,rej)=>{
        var key = process.env.SECRETKEY;

       jwt.sign({foo:'bar'},key,function(err,data){
        if(err){
          rej(err)
        }else{
          res(data)
        }
      });
      ;
    })

}

exports.getToken = async function(){
   var tok=  await token();
  //  console.log(tok);
 return ( data = {
  jwt_token : tok
})}