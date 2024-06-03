var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name:
    {
        type:String
    },
    image:
    {
        type:String
    }
})
module.exports= mongoose.model('category',schema);