//==================================== package requirements ================================

const   bodyParser        =   require("body-parser"),
        methodOverride    =   require("method-override"),
        expressSanitizer  =   require("express-sanitizer"),
        mongoose          =   require("mongoose"),
        express           =   require("express"),
        app               =   express();



      //============== setup of configurations ===================================================


//mongoose setup
app.use(bodyParser.urlencoded({extended : true}));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);



// APP CONFIG
var url = process.env.DATABASEURL || "mongodb://localhost/Books" ;
mongoose.connect(url);
 //mongoose.connect("mongodb://localhost/Books");
app.set("view engine", "ejs");
app.use(express.static("public"));
//app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));




// MONGOOSE/MODEL CONFIG
var bookSchema = new mongoose.Schema({
    title: String,
    image: String,
    author: String,
    comment: String
});


var book = mongoose.model("book", bookSchema);





// RESTFUL ROUTES




//homepage
app.get("/", function(req, res){
   res.redirect("/books"); 
});




// INDEX ROUTE
app.get("/books", function(req, res){
   book.find({}, function(err, books){
       if(err){
           console.log("ERROR!");
       } else {
          res.render("index", {books: books}); 
       }
   });
});




// NEW ROUTE   lead to cretion of new book form 
app.get("/books/new", function(req, res){
    res.render("new");
});






// CREATE ROUTE  create a new book in our database namely Books
app.post("/books", function(req, res){
    // create blog
    console.log(req.body);
    console.log("===========")
    req.body.book.body = req.sanitize(req.body.book.body)
    console.log(req.body);
    book.create(req.body.book, function(err, newbook){
        if(err){
            res.render("new");
        } else {
            //then, redirect to the index
            res.redirect("/books");
        }
    });
});




// SHOW ROUTE
app.get("/books/:id", function(req, res){
   book.findById(req.params.id, function(err, foundbook){
       if(err){
           res.redirect("/books");
       } else {
           res.render("show", {book: foundbook});
       }
   })
});

// EDIT ROUTE
app.get("/books/:id/edit", function(req, res){
    book.findById(req.params.id, function(err, foundbook){
        if(err){
            res.redirect("/books");
        } else {
            res.render("edit", {book: foundbook});
        }
    });
})


// UPDATE ROUTE
app.put("/books/:id", function(req, res){
    req.body.book.body = req.sanitize(req.body.book.body)
   book.findByIdAndUpdate(req.params.id, req.body.book, function(err, updatedbook){
      if(err){
          res.redirect("/books");
      }  else {
          res.redirect("/books/" + req.params.id);
      }
   });
});

// DELETE ROUTE
app.delete("/books/:id", function(req, res){
   //destroy blog
   book.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/books");
       } else {
           res.redirect("/books");
       }
   })
   //redirect somewhere
});
var port = 8000;
app.listen(port, function(){
    console.log("Your server is running on port :"+ port);
})

