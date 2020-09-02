const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pms', {useNewUrlParser: true, useUnifiedTopology: true});

var conn = mongoose.Collection;
var productSchema = new mongoose.Schema({
    productName:String,
    quantity:Number,
    productImage:{
        type:String,
        index:true,
        required:true,
        sparse:true
    },
    userID:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,ref:`users`,
        required:true
    }
});


var productModel = mongoose.model('productDetail',productSchema);
module.exports = productModel;