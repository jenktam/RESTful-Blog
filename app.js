var bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    express     = require("express"),
    app         = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL CONFID
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

var Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES

// INDEX ROUTE
app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("Error");
        } else {
            res.render("index", {blogs: blogs});
        }
    });

});

// NEW ROUTE
app.get("/blogs/new", function(req, res) {
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res) {
    // create blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        }
        else{
            // then, redirect
            res.redirect("/blogs");
        }
    });
});

// SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err){
            console.log(err);
        }
        else{
            res.render("show", {blog: foundBlog});
        }
    });
});

// EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
        } else{
            res.render("edit", { blog: foundBlog });
        }
    });
});

// UPDATE ROUTE

// DESTROY ROUTE

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("SERVER IS RUNNING!");
});