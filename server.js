

const express = require('express');
const app = express();
let db;
app.get('/', (req, res) => {
      res.sendFile(__dirname + '/index.html')
  })
  
  
  const bodyParser= require('body-parser')
  
  
  app.use(bodyParser.urlencoded({extended: true}))
  
  
  
  const MongoClient = require('mongodb').MongoClient;
  const DB_URI='mongodb+srv://dali:dali123@cluster0-cawup.mongodb.net/test?retryWrites=true&w=majority'
  MongoClient.connect(DB_URI, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.log("error : ",err);
      db = client.db('dali') // whatever your database name is
    // console.log(db)
  })

  app.post('/quotes', (req, res) => {
        db.collection('quotes').insertOne(req.body, (err, result) => {
            if (err) return console.log(err)
      
            console.log('saved to database')
            res.redirect('/')
          })
        })

app.listen(3000, function() {
    console.log('listening on 3000')
  })