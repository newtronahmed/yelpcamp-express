var mongoose = require('mongoose')
var campgroundSchema = mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Comments",
        }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
        username: String,
    }


});
var Campgrounds = mongoose.model("Campgrounds",campgroundSchema)
module.exports = Campgrounds