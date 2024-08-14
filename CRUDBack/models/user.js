const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator') 
const Schema = mongoose.Schema
const userSchema = new Schema({
    userName: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    uniqueToken:{
        type:String
    }
})
userSchema.plugin(uniqueValidator)
module.exports = mongoose.model('user',userSchema,'users')