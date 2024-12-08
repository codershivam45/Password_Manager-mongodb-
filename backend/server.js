import express from 'express'
import {MongoClient} from 'mongodb'
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'

// Connection URL 
const url ='mongodb://localhost:27017'
const client = new MongoClient(url)

// Database Name
const dbName='passcode'
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())

// Use connect method to connect to the server
await client.connect();
const db=client.db(dbName);

// get passwords 
app.get('/', async (req, res) => {
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})
// save password
app.post('/', async (req, res) => {
    const password = req.body
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password)
    res.send({sucess:true,result: findResult})
})
// delete password
app.delete('/', async (req, res) => {
    const password = req.body
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password)
    res.send({ sucess: true, result: findResult })
})
app.listen(port, () => {
    console.log(`Example app listening on  http://localhost:${port}`)
})