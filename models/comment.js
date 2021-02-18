var mongoose = require('mongoose')
commentSchema = mongoose.Schema({
    text : String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        username: String,
    },
    
});
var Comments = mongoose.model("Comments",commentSchema);
module.exports = Comments;