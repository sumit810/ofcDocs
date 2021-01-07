const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs')

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// app.set("view engine", "ejs");

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


app.route("/search")
    .get((req, res) => {
        console.log(__dirname);
        res.sendFile(__dirname + "/search.html");
    })
    .post((req, res) => {
        console.log(req.body);
        Document.find(
          { $text: { $search: req.body.searchString } },
          { score: { $meta: "textScore" } },
          (err, result) => {
            if (err) {
              res.send(err);
            } else {
              res.send(result);
            }
          }
        ).sort({ score: { $meta: "textScore" } });
    })


app.listen(3000, () => {
    console.log("Server is running");
})