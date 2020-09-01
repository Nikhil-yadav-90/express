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
        
        },
    userID:{
        type:mongoose.Schema.Types.ObjectId,ref:'users',  // This takes the refrence of the collection with which we want to join we have to provide that refrence collection or tabel id here because that is always unique 
        required:true
    }

})


var passModel = mongoose.model('Password_Details',addPassSchema)


var conn = mongoose.Collection;
module.exports = passModel;