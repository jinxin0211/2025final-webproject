var express = require("express");
var server = express();
var bodyParser = require("body-parser");


server.set("view engine", 'ejs');
server.set("views", __dirname+"/view")

var fileUpload = require("express-fileupload");

server.use(express.static(__dirname + "/final"));
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());
server.use(fileUpload({limits:{fileSize:2*1024*1024}}))

var DB=require("nedb-promises");
var herobannerDB=DB.create(__dirname+"/Database/herobanner.db");
server.get("/hero",async function(req,res){
    var herobanners=await herobannerDB.find({},{"_id":0});then(results=>{
       
        res.send(results);
    }).catch(error=>{
       res.status(500).send(error);
    });
});

herobannerDB.insert({
  tag: "LEAGUE OF LEGENDS",
  title: "When Legends Take the Stage",
  players: [
    { src: "images/uzi png.png", alt: "Uzi" },
    { src: "images/oner png.png", alt: "Oner" },
    { src: "images/chovy png.png", alt: "Chovy" },
    { src: "images/9132.png", alt: "Faker" },
    { src: "images/guma png.png", alt: "Gumayusi" },
    { src: "images/BDD png.png", alt: "BDD" },
    { src: "images/keria png.png", alt: "Keria" }
  ]
});

server.listen(8081,function(){
    console.log("Server listening on http://localhost:8081");
});