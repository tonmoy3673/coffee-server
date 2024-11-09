const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;
require('dotenv').config();
app.use(cors());
app.use(express.json());


const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@coffee.s1xws.mongodb.net/?retryWrites=true&w=majority&appName=coffee`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // const database = client.db("insertDB");
    // const haiku = database.collection("haiku");

    const coffeeCollection = client.db('coffeeDB').collection('coffee')

    app.post('/coffees', async(req,res)=>{
      const coffee = req.body;
      const result = await coffeeCollection.insertOne(coffee);
      res.send(result);

      console.log(coffee);
    })


  
    console.log(
      "MongoDB connected successfully!!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/", (req, res) => {
  res.send("Coffee Server is Connected");
});

app.listen(port, () => {
  console.log(`Coffee Server is running on port : ${port}`);
});


