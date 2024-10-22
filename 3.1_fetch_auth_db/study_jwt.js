// jsonwebtoken

var jwt = require("jsonwebtoken")
var token  = jwt.sign({foo: "bar"}, "shhhhh");

// or
// sign with RSA SHA256
var privateKey = fs.readFileSync('private.key');
var token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' });


// sign async 

jwt.sign({foo: 'bar'}, privateKey, {algorithm: 'RS256'}, (err,token)=>{
    console.log(token);
})

// backdate with 30 sec

var old_token = jwt.sign({foo: 'bar', iat: Math.floor(Date.now()/1000)-30}, "shhhhh")


// signing a token with 1hour of expiry

jwt.sign({
    exp: Math.floor(Date.now()/1000) +  (60*60),
    data : "foobar"
}, "secret");

// jwt.verify(token, secretOrPublicKey, [options,callbacks])

var decoded = jwt.verify(token, "shhhhh");
console.log(decoded.foo) //bar

// verify a token symmetric
jwt.verify(token, "shhhhh", function(err,decoded){
    console.log(decoded.foo) // bar
})

// invalid token -synchronous
try{
    var decoded = jwt.verify(token, "wrong-secret");
}catch(err){
    // err
}

// invalid token
jwt.verify(token, 'wrong-secret', function(err, decoded) {
    // err
    // decoded undefined
  });

// verify a token asymmetric
var cert = fs.readFileSync('public.pem');  // get public key
jwt.verify(token, cert, function(err, decoded) {
  console.log(decoded.foo) // bar
});

jwt.verify(token, 'shhhhh', function(err, decoded) {
    if (err) {
      /*
        err = {
          name: 'NotBeforeError',
          message: 'jwt not active',
          date: 2018-10-04T16:10:44.000Z
        }
      */
    }
  });
  

//  done with jwt only token - jwt.sign and verify decoded - jwt.verify