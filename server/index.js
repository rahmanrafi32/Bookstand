const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
port = process.env.PORT || 3001;
const MongoClient = require('mongodb').MongoClient;
const ObjectID  = require('mongodb').ObjectID;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@firstcluster.bte1v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(cors());


client.connect(err => {

     const book = client.db("BookStand").collection("books");

     app.post('/addBook', (req,res)=>{
          const bookInfo = req.body
          book.insertOne(bookInfo).then(result=> console.log(result.insertedCount));
     })

     app.get('/books',(req,res)=>{
          book.find({}).toArray((err,books)=>{
               res.send(books);
          })
     })
     app.get('/books/:id',(req,res)=>{
          book.find({_id: ObjectID(req.params.id)})
          .toArray((err,books)=>{
               res.send(books);
          })
     })

     app.delete('/books/:id',(req,res)=>{
          book.findOneAndDelete({_id: ObjectID(req.params.id)})
     })

     const order = client.db("BookStand").collection("orderInfo");     
     app.post('/orderItem', (req,res)=>{
          const data = req.body;
          order.insertOne(data).then(result=> console.log(result.insertedCount));
     })

     app.get('/orders',(req,res)=>{
          const queryData = req.query
          order.find(queryData)
          .toArray((err,orders)=>{
               res.json(orders)
          })
     })
});

app.get('/', (req,res)=>{
     res.send('Server site is working perfectly')
})

app.listen(port);