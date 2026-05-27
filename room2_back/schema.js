const mongoose = require('mongoose');
const db = require('./db');
const validator = require('validator');
const {Schema}= require('mongoose');
const data = new Schema({
    username:{
        type:String,
        required:true,
        maxLength:20,
        minLength:3,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        maxLength:50,
        minLength:5,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    }
})
module.exports = mongoose.model('user',data)