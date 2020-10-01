const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.is4kq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = 5000


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    // const productsCollection = `client.db(${process.env.DB_NAME}).collection(${process.env.DB_COLLECTION_NAME})`;
    const productsCollection = client.db("emaJohnStore").collection("products");
    console.log('Database connect successfully !!');

    app.post('/addProduct', (req, res) => {
        const products = req.body;
        console.log(products);
        productsCollection.insertMany(products)
            .then(result => {
                console.log(result.insertedCount);
                res.send(result.insertedCount)
            })
    })

});

app.listen(port)

// module 50 er 1,2,3 porjonto code done



