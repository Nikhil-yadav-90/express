const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pms', {useNewUrlParser: true, useUnifiedTopology: true});

var addPassSchema = mongoose.Schema({
    catagoryName: {
    type:String,
    required:true,
    index:{
        unique:true
    }
    },
    date:{
        type:Date,
        default:Date.now
    },
    passWord_Detail:{
        type:String,
        required:true,
        
        } 

})


var passModel = mongoose.model('Password_Details',addPassSchema)


var conn = mongoose.Collection;
module.exports = passModel;