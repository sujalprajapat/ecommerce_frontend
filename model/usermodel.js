var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})
module.exports= mongoose.model('user',schema);