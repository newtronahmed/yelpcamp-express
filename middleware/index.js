var middlewares = {}
var Campgrounds = require('../models/campground')
var Comments = require('../models/comment')
middlewares.campgroundPermission = function (req,res,next){
    //check if user is authenticated
    if(req.isAuthenticated()){
        //find the campground 
        Campgrounds.findById(req.params.id,(err,campground)=>{
            //if error redirect to /
            if(err){
                res.redirect('/')
            }else {
                //if no error and campground author=== auth.user return next 
                if(campground.author.id.equals(req.user._id)){
                    next()
                }else {
                    //if campground author id is not equal to auth user id
                    res.redirect('back')
                }
            }
            
        })
    }else {
        //if user is not logged in
        req.flash('error','You need to be authenticated first')
        res.redirect('back')
    }
}
middlewares.isLoggedIn=function (req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    req.flash('error','You need to be authenticated first')
    res.redirect('/login')
}
middlewares.checkCommentOwnership= function  (req,res,next){
    if(req.isAuthenticated()){
        Comments.findById(req.params.comment_id,function(err,comment){
            if(comment.author.id.equals(req.user._id)){
                next()
            }else {
                res.send('you do not have permission to access this route')
            }
        })
    }else {
        req.flash('error','You need to be authenticated first')
        res.redirect('/login')
    }
}
middlewares.checkCredentials = function (req,res,next){
    if(req.body.username=='' || req.body.password == ''){
        req.flash('error','Username and password field is required')
        res.redirect('back')
    }else {
        next()
    }
    
}
module.exports = middlewares;