const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 5000 ;

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.shttn.mongodb.net/${process.env.DB_USER}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const productsCollection = client.db("foodBazar").collection("products");

  
  
  app.post("/addProduct", (req, res)=>{
      const newProduct = req.body;
      console.log(newProduct);
      productsCollection.insertOne(newProduct);
  });

  app.get("/products", (req,res)=>{
    productsCollection.find({})
    .toArray((err, document)=>{
      res.send(document);
    })
  })

  app.get("/product/:key", (req, res)=>{
    productsCollection.find({key: req.params.key})
    .toArray((err, document)=>{
      res.send(document[0]);
    })
  })
  
});

app.get("/", (req, res) => {
  res.send("Hello Fuad Welcome!");
});

app.listen(process.env.PORT || port);
