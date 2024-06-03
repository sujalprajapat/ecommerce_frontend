var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    email:{
        type:String,
    },
    password:{
        type:String,
    }
})
module.exports= mongoose.model('admin',schema);