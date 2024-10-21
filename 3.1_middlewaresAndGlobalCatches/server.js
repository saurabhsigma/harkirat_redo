const express = require("express");
const app = express();

let numberOfRequests = 0;
let totalResponseTime = 0; // To keep track of total response time

// Middleware to count the number of requests
app.use((req, res, next) => {
    numberOfRequests += 1; // Increment the request count
    console.log("Total requests:", numberOfRequests); // Log the current request count
    next(); // Pass control to the next middleware
});

// Middleware to calculate response time
app.use((req, res, next) => {
    const start = Date.now(); // Record the start time

    // Capture the response end event
    res.on('finish', () => {
        const duration = Date.now() - start; // Calculate duration
        totalResponseTime += duration; // Accumulate total response time
        console.log("Response time for this request:", duration, "ms");
        
        // Calculate and log the average response time
        const averageResponseTime = totalResponseTime / numberOfRequests;
        console.log("Average response time:", averageResponseTime, "ms");
    });

    next(); // Pass control to the next middleware
});

// Using middlewares imported for all the route requests
app.use(express.json());

function userMiddleware(req, res, next) {
    const { username, password } = req.body; // Get username and password from the request body
    if (username !== "saurabh" || password !== "password") {
        return res.status(403).json({
            msg: "incorrect inputs",
        });
    }
    next(); // Call next middleware if inputs are correct
}

function kidneyMiddleware(req, res, next) {
    const { kidneyId } = req.body; // Get kidneyId from the request body
    if (kidneyId !== 1 && kidneyId !== 2) {
        return res.status(403).json({
            msg: "incorrect inputs"
        });
    }
    next(); // Call next middleware if inputs are correct
}

app.get("/health-checkup", userMiddleware, kidneyMiddleware, (req, res) => {
    // Do something with kidney here..
    res.send("your heart is healthy");
});

app.get("/health", userMiddleware, kidneyMiddleware, (req, res) => {
    // Do something with kidney here..
    res.send("your heart is healthy");
});

app.get("/checkup", userMiddleware, (req, res) => {
    // Do something with kidney here..
    res.send("your heart is healthy");
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});


// assigments questions

// 1. count the number of requests
// 2. find the average time you server is taking to handle requests



// the mistake i was doing // middleware to find the response time of the server to handle a request
// let sendDate = (new Date()).getTime();

// app.use((req,res,next)=>{
//     let receiveDate = (new Date()).getTime();

//     let responseTime = receiveDate - sendDate;

//     console.log("response time for thise request is ",  responseTime);

//     next();
// })

// the actual code 
// middleware to calculate response time
// let totalResponseTime = 0
// app.use((req,res,next)=>{
//     const start = Date.now(); // record the start time

//     // capture the response end event
//     res.on("finish", ()=>{
//         const duration = Date.now() - start; // calculate the duration
//         totalResponseTime+= duration;
//         console.log("response time for this request: ", duration, "ms");

//         // calculate and log the average response time
//         const averageResponseTime = totalResponseTime / numberOfRequests;
//         console.log("average response time: ", averageResponseTime, "ms");
//     });
//     next();
// })


// we understand middlewares


// why do we need input validation? what if user send the wrong body

// Global catches helps you give the user a better error messagge

// error-handling middleware : this is a special type od middleare function in express
// that has four arguments instead of three (err, req, res, next). express recognise it
// as an error-handling middleware because of these four arguments


app.use((error, req, res, next)=>{
    // console.error(error); // log the error for debugging
    res.status(500).send("An internal server error occurred");
});

// how can you do better input validation
// this is where zod comes into play

const z = require("zod");


const kidneysInput = z.literal("1").or(z.literal("2"));

app.post("/health-checkup", function(req,res){
    //  do something with kidneys here..
    const kidneyId = req.body.kidneyId;
    const validation = kidneysInput.safeParse(kidneyId);
    if(!validation.success){
        res.send("Incorrect input");
        return;
    }
    res.send("Your kideny id is : ", kidneyId);
});

// app.listen(4000);

// this is how we can have better input validation - use the zod library and refer to its documentations for more details

// till now
// middlewares - done
// authentication - left
// global catches - done
// zod - done


// authentication - jsonwebtokens

// dumb way - Ask tthe user to send the username and password in all requests as headers

// slightly better way - 
// 1. Give the user the token on signup/login
// 2. Ask the user to send back the toke nin all the future requests
// 3. when the user logs out, ask rthe user to forget the token(or revoke it from the backend)

// so the library we need to learn is - jsonwebtoken