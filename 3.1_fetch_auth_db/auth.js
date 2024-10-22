const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors")

app.use(cors());
app.use(express.json())


const users = [
    {
        username: "saurabh",
        password: "123"
    },
]


// middleware to verify the token 
const authenticateToken = (req,res,next)=>{
    const authHeader = req.heeaders['authorization'];
    const token  = authHeader && authHeader.split(" ")[1]  // Token should be in the format: "Bearer <token>"

    if (token== null) return res.status(402);

    jwt.verify(token, "shhh", (err,user)=>{
        if(err) return res.status(403);

        req.user =user;
        next();
    })
}


app.get("/", (req,res)=>{
    res.send("hi there!");

})

app.post("/signin", (req,res)=>{
    const {username, password} = req.body;
    if(!username || !password){
        console.log("username and password both required");
        return res.status(400).json({
            message: "username and password are both required"
        })
    }
    // Check if the username already exists
    const userExists = users.find(user => user.username === username);
    if (userExists) {
        return res.status(400).json({ message: "Username already exists." });
    }

users.push({ username, password });
    res.status(201).json({ message: "User signed up successfully!" });
})


app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Check if the user exists and the password matches
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: "Invalid username or password." });
    }

    const token = jwt.sign({ username: username }, "shhh", { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
});

// Protected route that requires a valid token to access
app.get("/dashboard", authenticateToken, (req, res) => {
    res.json({ message: `Welcome to the dashboard, ${req.user.username}!` });
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

