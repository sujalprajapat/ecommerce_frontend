var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name:{
        type:String,
    },
    answer:{
        type:String,
    },
    question:{
        type:String,
    },
    puzzle_img:{
        type:String,
    },
    cat_name:{
        type:String,
    },
    cat_id:{
        type: mongoose.Schema.Types.String,
        ref: "category"
    },
})
module.exports= mongoose.model('puzzle',schema);