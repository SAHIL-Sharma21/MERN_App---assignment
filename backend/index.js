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
// const DBNAME = "users";
const DBNAME = "Blog";
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

app.post("/users", async (req, res) => {

    const {username, email, userAge} = req.body;

    if([username, email, userAge].some(field => !field)){
        res.status(400).json({message: "All fields are required"});
        return;
    }

    const userObj = {
        username,
        email,
        userAge
    }

    try {
        const response = await db.collection('users').insertOne(userObj);
        return res.status(201).json(response);
        
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
});

//get user by email
app.get("/users/:email", async (req, res) => {

    const {email} = req.params;

    if(!email){
        res.status(400).json({message: "Email is required"});
        return;
    }

    try {
        const user = await db.collection("users").findOne({email});

        if(!user){
            res.status(404).json({message: "User not found"});
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({message: "Internal server error"});        
    }
});


//REST API Design for BLOG APP
app.post("/posts", async(res, req) => {
    const {title, content, author} = req.body;

    if([title, content, author].some(field => !field)){
        res.status(400).json({message: "All fields are required"});
        return;
    }

    const newPost = {
        title,
        content,
        author,
      };

      try {
        const response = await db.collection('posts').insertOne(newPost); 
        res.status(201).json({ message: 'Post created', postId: response.insertedId }); 
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
      }
});

app.get('/posts', async (req, res) => {
    try {
      const posts = await db.collection('posts').find({}).toArray(); 
      res.status(200).json(posts); 
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const post = await db.collection('posts').findOne({ _id: new MongoClient.ObjectId(id) }); // Find post by ID
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json(post); 
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;
  
    // Validate the request body
    if (!title || !content || !author) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    const updatedPost = {
      title,
      content,
      author,
    };
  
    try {
      const result = await db.collection('posts').updateOne({ _id: new MongoClient.ObjectId(id) }, { $set: updatedPost }); 
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({ message: 'Post updated' }); 
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await db.collection('posts').deleteOne({ _id: new MongoClient.ObjectId(id) }); 
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({ message: 'Post deleted' }); 
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
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