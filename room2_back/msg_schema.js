const mongoose = require('mongoose')
const db = require('./db')

const {Schema} = mongoose

const schema = new Schema({
    username:{
     type:String   ,
     required:true
    }
,
   receiver:{
        type : String,
        required:true
    },
    room:{
        type :String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
)

module.exports = mongoose.model('Message', schema)