var Campgrounds = require('./models/campground')
var Comments = require('./models/comment')
var seeds = [
    {
        name:'hotel transyvania',
        description:'The haunted house of dracula',
        price:5000,
        image:'',

    },
    {
        name:'Slytherin Chamber',
        description:'Marvelous scenery wit absolute peace and humidity',
        price:5000,
        image:'',

    },
    {
        name:'Leventis avenue',
        description:'Excellent scenery wit absolute peace and humidity',
        price:5000,
        image:'',

    },
]
function seedDb (){
    Comments.remove({},function(err){
        if(err){
            console.log(err)
        }else {
            console.log('comments removed');
            Campgrounds.remove({},function(err){
                if(err){
                    console.log(err)
                }else {
                    
                    // seeds.forEach(seed=>{
                    //     Campgrounds.create(seed,function(err,campground){
                    //         if(err){
                    //             console.log(err)
                    //         }else {
                    //             console.log('added campground')
                    //             //add comments
                    //             Comments.create({text:'nice campground , almost lived there for a year', author:'abraham moses'}, function(err,comment){
                    //                 if(err){
                    //                     console.log(err)
                    //                 }else {
                    //                     campground.comments.push(comment)
                    //                     campground.save()
                    //                     console.log('added comments');
                                        
                    //                 }
                    //             })
                    //         }
                    //     })
                    // })
                }
            })
        }
        
        
    })
    
}
module.exports = seedDb;