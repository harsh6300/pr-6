const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    title : {
        type : String,
        required : true    
    },
    description:{
        type : String,
        required : true
    },
    images : {
        type : String,
        required : true
    }
    
})

const table = mongoose.model('form',formSchema);
module.exports = table;