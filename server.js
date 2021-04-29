console.log("Welcome to Note Taker App")

const express = require('express');
const path = require('path');

const app = express();
var PORT = process.env.PORT || 5500;
let database = require('./db/db.json')

app.use(express.urlencoded({extended:true})); 
app.use(express.json());
app.use(express.static(`./public`));    

app.get("/notes",function(req, res){
    res.sendFile(path.join(__dirname,"./public/notes.html"));
})

app.get("/api/notes", (req,res) => {
    res.json(database);
});

app.post("/api/notes", function(req, res){
    const newNote = {
        title: req.body.title,
        text: req.body.text,
    }

    database.push(newNote);
    res.json(database);

});


app.get("*", function(req,res) {
    res.sendFile(path.join(__dirname,"./public/index.html"))
})

app.listen(PORT, ()=> {
    console.log(`Listening on port ${PORT}`)
});