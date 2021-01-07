const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs')

const app = express();

let docs = [];
let searchStr = "";

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/bko", {useNewUrlParser: true, useUnifiedTopology: true});

const documentSchema = mongoose.Schema({    
  "dept" : String,
	"district" : String,
	"docId" : Number,
	"docLocation" : String,
	"docType" : String,
	"partyName" : String,
	"pinCode" : Number,
	"tehsil" : String,
	"vpo" : String
});

const Document = mongoose.model("Documents", documentSchema);

// let search0 = true;

app.route("/search")
    .get((req, res) => {
        res.render("search", {docs: docs, searchStr: searchStr});
    })
    .post((req, res) => {
        
        
        Document.find(
          { $text: { $search: req.body.searchString } },
          { score: { $meta: "textScore" } },
          (err, result) => {
            if (err) {
              res.send(err);
            } else {
              docs = result;
              searchStr = req.body.searchString;
              res.redirect("/search");
            }
          }
        ).sort({ score: { $meta: "textScore" } });
    })


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})