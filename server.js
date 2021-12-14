const express = require("express");
const bodyParser = require('body-parser')
const fs = require('fs');
const app = express();
const cors = require("cors")

app.use(cors())
app.use(express.static("./src"));

app.listen(process.env.port || 8080);
console.log('Running at Port 8080');

var accounts = {};
fs.readFile('./serverConfig.json', 'utf8', function (err, stuff) {
    if (err) throw err;
    accounts = JSON.parse(stuff);
});

app.get("/",(req,res)=>{
    res.sendFile("index.html", { root: __dirname + "/src" })
})
app.get("/selectRole",(req,res)=>{
    res.sendFile("selectRole.html", { root: __dirname + "/src" })
})
app.get("/farmer",(req,res)=>{
    res.sendFile("farmer.html", { root: __dirname + "/src" })
})
app.get("/microFin",(req,res)=>{
    res.sendFile("microFin.html", { root: __dirname + "/src" })
})
app.get("/customer",(req,res)=>{
    res.sendFile("customer.html", { root: __dirname + "/src" })
})
app.get("/qualityTest",(req,res)=>{
    res.sendFile("qualityTest.html", { root: __dirname + "/src" })
})
app.get("/myAccount", (req, res)=>{
    if(accounts[req.query.id?.toString().toLowerCase()]!=undefined){
        res.send(JSON.stringify({data:accounts[req.query.id.toString().toLowerCase()]}))
    }else{
        res.send(JSON.stringify({data:"none"}))
    }
})
app.post("/addAccount",bodyParser.json(),(req, res) => {
    newAdd = req.body  // <==== req.body will be a parsed JSON object
    console.log('Got body:', req.body.data );
    accounts[req.body.data[0].toString()]=req.body.data[1]
    fs.writeFileSync('serverConfig.json',JSON.stringify( accounts));
    res.sendStatus(200);
})