const express = require("express");
const app = express();
const helmet = require("helmet");
const port = 2000;
const path = require("path");
const livereload = require("livereload");
const server = require('http').createServer(app)
// const io = require('socket.io')(server)
// const url = 'mongodb+srv://wweb:aS0507499583@cluster0.k7mzw.mongodb.net/?retryWrites=true&w=majority'
var MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://family:aS0507499583@cluster0.dvljyns.mongodb.net/?retryWrites=true&w=majority"
app.use(express.static("public"));
app.use(helmet());
app.use(express.urlencoded({ extended: true }))
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
})



app.get('/:family/user', (req, res) => {
  res.sendFile('public/user.html', { root: '.' })
})

app.get('/:family/admin', (req, res) => {
  res.sendFile('public/admin.html', { root: '.' })
})


app.post('/:family/save', (req, res) => {

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("newData");
    dbo.collection("aaa").updateOne(
      { name:req.params.family },
      {
        $set: { 'data': JSON.parse(req.body.data) }
      }, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
      });
  });

  // console.log(req.body.data)
  res.end("aaa")
})


app.get('/:family/load', (req, res) => {

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("newData");
    dbo.collection("aaa").findOne({ name: req.params.family}).then(x => {
      res.json(x.data)
      // socket.emit('data', x.data)
    }).catch(err => {
      console.log(err)
    })

  });
})

server.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:2000/all/user`)
})