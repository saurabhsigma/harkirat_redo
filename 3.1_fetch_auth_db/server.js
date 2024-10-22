// done with fetch now on to auth and db

// project for the day - 

// let people sign up to your website 
// only allow signed in users to see people (create a dummy people list)


const express = require("express");
const app = express();
const jwt  = require("jsonwebtoken")
const port = 4009;
const jwtPassword = "123456";

app.use(express.json());


// inhouse db
const ALL_USERS = [
    {
      username: "harkirat@gmail.com",
      password: "123",
      name: "harkirat singh",
    },
    {
      username: "raman@gmail.com",
      password: "123321",
      name: "Raman singh",
    },
    {
      username: "priya@gmail.com",
      password: "123321",
      name: "Priya kumari",
    },
  ];


  function userExists(username, password) {
    return ALL_USERS.some((user) => user.username === username && user.password === password);
  }
// checking all the users and checking if the current user is authorized

// getting values from the body req.body
  

app.post("/signin", (req,res)=>{
    const username = req.body.username;
  const password = req.body.password;
    if(!userExists(username , password)){
        return res.status(403).json({
            msg: "User doesnt exist in our in memory db",
        });
    }
    var token  = jwt.sign({username: username}, "shhhh"); // token with the jwt secret
    return res.json({
        token,
    });
});
// if user exists token (generate) = jwt.sign({username:username}, "shh") "salt or key i dont know as of now"

app.get("/homepage", (req, res) => {
    const token = req.headers.authorization;
    try {
      const decoded = json.verify(token, jwtPassword);
      const username = decoded.username;
  
      // Return all users except the current user
      const otherUsers = ALL_USERS.filter((user) => user.username !== username);
      
      res.json({
        message: "Welcome to the home page! You have successfully logged in.",
        users: otherUsers,  // returning the filtered user list
      });
    } catch (err) {
      return res.status(403).json({
        msg: "Invalid token",
      });
    }
  });
  

app.get("/", (req,res)=>{
    res.send("hello")
})

app.listen(port);


// databases

// till now jwt auth, db , middlewares, api calls 
// left models and controllers in db 