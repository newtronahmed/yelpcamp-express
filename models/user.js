var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')
var userSchema = mongoose.Schema({
    username:String,
    password:String,
    // campgrounds:[
    //     {type: mongoose.Schema.Types.ObjectId, ref:'Campgrounds'}
    // ]
});
userSchema.plugin(passportLocalMongoose)
var User = mongoose.model('User',userSchema)
module.exports = User;