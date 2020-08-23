const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pms', {useNewUrlParser: true, useUnifiedTopology: true});

var passSchema = mongoose.Schema({
    catagoryName: String,
    date:{
        type:Date,
        default:Date.now
    }
})


var passCatModel = mongoose.model('Password Catagory',passSchema)


var conn = mongoose.Collection;
module.exports = passCatModel;