var express = require('express')
var router = express.Router()
var Campgrounds = require('../models/campground')
var middlewares = require('../middleware')
// index

router.get('/', (req,res)=>{
    Campgrounds.find({},function(err,campgrounds){
        if(err){
            console.log(err);
        }else {
            // res.json(campgrounds)
            
            res.render('index',{campgrounds})
        } 
    })
    // res.send()
});
// store
router.post('/',middlewares.isLoggedIn,(req,res)=>{
    var {name,image,description,price} = req.body
    var author = {id:req.user._id,username:req.user.username}
    var newCampground = {name,image,description,price,author}
    Campgrounds.create(newCampground,(err,newCampground)=>{
        if(err){
            console.log(err);        
        }else{

            req.flash('success','Campground created successfully')
            // console.log(newCampground.author)
            res.redirect('/campgrounds')
        }
    })
    
})

//create
router.get('/new',middlewares.isLoggedIn,(req,res)=>{

    res.render('new');
})
//show
router.get('/:id',(req,res)=>{
    var id = req.params.id
    Campgrounds.findById({_id:id}).populate('comments').exec((err,campground)=>{
        if(err){
            console.log(err)
        }else {
            // console.log(campground);   
            res.render('show',{campground})
        }
    });
    
});
//edit
router.get('/:id/edit',middlewares.campgroundPermission,function(req,res){
    Campgrounds.findById({_id:req.params.id},function(err,campground){  
       
            res.render('edit',{campground})
    })
    
})
//update
router.put('/:id',middlewares.campgroundPermission,function(req,res){
    Campgrounds.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            console.log(err);
            
        }else {
            req.flash('success','Campground successfully updated')
            res.redirect('/campgrounds/'+req.params.id)
        }
    })
})
//delete route
router.delete('/:id',middlewares.campgroundPermission, function(req,res){
    Campgrounds.findByIdAndDelete(req.params.id,function(err){
        if(err){
            console.log(err);
            
        }else {
            req.flash('success','Campground successfully deleted')
            res.redirect('/campgrounds')
        }
    })
})



module.exports = router;