const express = require("express")
const bodyParser = require("body-parser")
// requiring a module located here
const date = require(__dirname + "/date.js")

// possible to push items into the array but can't assign it to a different one
// also objects, can change values not keys
const items = []
const workItems = []

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
 
app.set('view engine', 'ejs')

app.get("/", function(req,res){
    
    const day = date.getDate()

    res.render('list', {listTitle: day, newListItems: items})

})

app.get("/work", function(req, res){
    res.render('list', {listTitle: "Work List", newListItems: workItems})
})

app.post("/work", function(req, res){
    const item = req.body.newItem
    workItems.push(item)
    res.redirect("/work")
})

app.post("/", function(req, res){
    const item = req.body.newItem
    if(req.body.list ==="Work") {
        workItems.push(item)
        res.redirect("/work")
    } else{
        items.push(item)
        res.redirect("/")
    }

})

app.get("/about", function(req, res){
    res.render('about')
})

app.listen(3000, ()=>{
    console.log("Server started on port 3000")
})
