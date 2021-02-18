var express = require('express')
var router = express.Router()
var passport = require('passport')
var User = require('../models/user')
var middlewares = require('../middleware')
//==============
//Auth
//==============

router.get('/register',function(req,res){
    res.render('auth/register');
});

router.post('/register',function(req,res){
    var newUser = new User({username:req.body.username})
    //register user using passport mongoose local plugin method
    User.register(newUser, req.body.password, function(err,user) {
        if(err){
            // console.log(err)
            req.flash('error',err.message)
            return res.redirect('/register')
        }else {
            //if no error authenticate using passport
            
            passport.authenticate("local")(req,res,function(){
                req.flash('success','Welcome to Yelp camp'+user.username)
                res.redirect('/campgrounds')
            })
        }
    })
});

router.get('/login',function(req,res){
    res.render('auth/login')
});
router.post('/login',passport
.authenticate('local',{successRedirect:'/',failureRedirect:'/login'}) ,
function(req,res){

});
router.get('/logout',function(req,res){
    req.logout()
    res.redirect('/login')
})
module.exports = router;