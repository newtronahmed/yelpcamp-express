const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const mongoClient = require('mongodb')
const passport = require('passport');
const LocalPassport = require('passport-local')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const bodyParser = require('body-parser')
const seedDb = require('./seed')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(express.static(__dirname+'/public'))
mongoose.connect("mongodb://localhost:27017/yelp_camp")
var Campgrounds = require('./models/campground.js')
var Comments = require('./models/comment')
var User = require('./models/user')
var commentRoutes = require('./routes/comment') ,
 campgroundRoutes = require('./routes/campground'),
 indexRoutes = require('./routes/index');
app.set('view engine','ejs')
app.use(flash())
seedDb()
// Schema 
//Passport Configuration
app.use(require('express-session')({
    secret: 'passport user authentication',
    resave:false,
    saveUninitialized:false,
}));
//passport implementation
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalPassport(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
});


// Campgrounds.create({
//     name: 'The land of myth',
//     image:'',
//     price:1000,
//     description: 'In a land of myth and a time of magic'
// },function(err,campgrounds){
//     if(err){
//         console.log(err);
        
//     }else {
//         console.log(campgrounds)
//     }
// })
app.get('/',function(req,res){
    res.redirect('/campgrounds')
})
app.use(indexRoutes)

app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/comments',commentRoutes)





app.listen(3000,()=>{
    console.log('server started')
})