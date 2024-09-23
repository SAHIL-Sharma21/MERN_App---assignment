//writing nodejs server
import express from 'express'
import cors from 'cors';
import fs from 'fs';
import dotenv from 'dotenv'
import {MongoClient} from 'mongodb';

dotenv.config({
    path: "./.env"
});

const mongoURI = process.env.MONGODB_URI;
const DBNAME = "users";
let db;
const connectDB = async () => {
    try {
        const client = new MongoClient(mongoURI, {
            useUnifiedTopology: true
        });
        await client.connect();
        db = client.db(DBNAME);
        console.log("Connected to mongodb..");
        
    } catch (error) {
        console.log("Error connecting to database..", error);
        process.exit(1);
    }
}

const app = express();
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
}));


app.get("/", (_, res) => {
    res.end("hello World");
})

// app.get("/users", async (req, res) => {
//     //sending users data
//     fs.readFile('./usersData.json', (err, data) => {
//         if (err){
//             res.status(500).json({message: "Internal server error"});
//         }
//         console.log(data.toString());
//         res.status(200).json(JSON.parse(data));
//     });
// });

//get user from the database
app.get("/users", async (req, res) => {
    try {
        const users = await db.collection("users").find({}).toArray();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
});

connectDB().then(() => {
    app.listen(PORT,() => {
        console.log(`server is running on port ${PORT}`);
    })
}).catch((error) => {
    console.log("Error connecting to database..", error);
    process.exit(1);
});