var express = require('express')
var router = express.Router({mergeParams:true})
var Campgrounds = require('../models/campground')
var Comments = require('../models/comment')
var middlewares = require('../middleware')
router.post('/', middlewares.isLoggedIn,(req,res)=>{
    var id = req.params.id
    Campgrounds.findById({_id:id},function(err,campground){
        if(err){
            console.log(err); 
        }else {
            Comments.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user._id,
                    comment.author.username = req.user.username
                    comment.save()
                    // console.log(comment.author)
                    campground.comments.push(comment)
                    campground.save()
                    req.flash('success','comment added successfully')
                    res.redirect('/campgrounds/'+campground._id)
                }
            })
        }
    })
});
router.get('/:comment_id',middlewares.checkCommentOwnership, function(req,res){
    Comments.findById(req.params.comment_id,function(err,comment){
        if(err){
            console.log(err);
        }else {
            // console.log(req.params.comment_id)
            // console.log(comment._id);
            
            res.render('edit-comment',{comment,campground_id:req.params.id})
        }
    })
    
});
router.put('/:comment_id',middlewares.checkCommentOwnership, function(req,res){
    // console.log(req.params.comment_id)
    Comments.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,comment){
        if(err){
            console.log(err);
            
        }else {
            // console.log(comment); 
            req.flash('success','comment succesfully updated')
            res.redirect('/campgrounds/'+req.params.id)
        }
    })
});
router.delete('/:comment_id',middlewares.checkCommentOwnership, function(req,res){
Comments.findByIdAndRemove(req.params.comment_id,function(err){
    if(err){
        res.redirect('back')
    }else {
        req.flash('success','comment deleted successfully')
        res.redirect('/campgrounds/'+req.params.id);
    }
})
})



module.exports = router;