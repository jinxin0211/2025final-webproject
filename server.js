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
var fmvpDB = DB.create(__dirname + "/Database/fmvp.db");
server.get("/hero",async function(req,res){
    var herobanners=await herobannerDB.find({},{"_id":0});then(results=>{
       
        res.send(results);
    }).catch(error=>{
       res.status(500).send(error);
    });
});

server.get("/fmvp", async function (req, res) {
  try {
    // 依 year 排序（由小到大）
    var results = await fmvpDB.find({}, { _id: 0 }).sort({ year: 1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message || String(error) });
  }
});

herobannerDB.insert({
  tag: "LEAGUE OF LEGENDS",
  title: "When Legends Take the Stage",
  subtitle: "World Champions · Legends · Moments",
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

 fmvpDB.insert([
        {
          year: 2022,
          player: "Kingen",
          team: "DRX",
          lane: "Top",
          traits: "Teamfight Initiation and Split Pushing",
          desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla, accusantium aspernatur accusamus voluptate nobis fugiat neque!",
          panelClass: "panel-2022",
          photoClass: "fmvp-2022",
          heroes: [
            { name: "Aatrox", img: "images/Aatrox_0.jpg" },
            { name: "Camille", img: "images/Camille_0.jpg" },
            { name: "Sejuani", img: "images/Sejuani_0.jpg" }
          ]
        },
        {
          year: 2023,
          player: "Zeus",
          team: "T1",
          lane: "Top",
          traits: "Teamfight Initiation and Split Pushing",
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima veritatis fugit numquam harum eius.",
          panelClass: "panel-2023",
          photoClass: "fmvp-2023",
          heroes: [
            { name: "Aatrox", img: "images/Aatrox_0.jpg" },
            { name: "Camille", img: "images/Camille_0.jpg" },
            { name: "Sejuani", img: "images/Sejuani_0.jpg" }
          ]
        },
        {
          year: 2024,
          player: "Faker",
          team: "T1",
          lane: "Mid",
          traits: "High damage output and playmaking ability",
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque reiciendis tempora harum eveniet quisquam.",
          panelClass: "panel-2024",
          photoClass: "fmvp-2024",
          heroes: [
            { name: "Aatrox", img: "images/Aatrox_0.jpg" },
            { name: "Camille", img: "images/Camille_0.jpg" },
            { name: "Sejuani", img: "images/Sejuani_0.jpg" }
          ]
        },
        {
          year: 2025,
          player: "Gumayusi",
          team: "T1",
          lane: "AD Carry",
          traits: "Exceptional positioning and consistent damage output",
          desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, iure. Est, praesentium.",
          panelClass: "panel-2025",
          photoClass: "fmvp-2025",
          heroes: [
            { name: "Aatrox", img: "images/Aatrox_0.jpg" },
            { name: "Camille", img: "images/Camille_0.jpg" },
            { name: "Sejuani", img: "images/Sejuani_0.jpg" }
          ]
        }
      ]);

  (async function initDB() {
  try {
  } catch (e) {
    console.log("Init DB error:", e);
  }
})();



    

server.listen(8081,function(){
    console.log("Server listening on http://localhost:8081");
});