require("./configs/dotenv");
const express = require('express');
const cors = require('cors');
const {signIn, signUp} = require("./controllers/auth");
const client = require("./configs/db");
const passport = require("passport");
const session = require("express-session");
require("./google-fb");

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET}));

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.status(200).send('Server is up and running');
});

app.get('/auth/google',
    passport.authenticate('google',{scope: ['email','profile']})
);
app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email']})
);

app.get('/google/callback',
    passport.authenticate('google',{
        successRedirect: '',
        failureRedirect: '/auth/failure',
    })
);
app.get('/facebook/callback',
  passport.authenticate('facebook',{
       successRedirect: '',
       failureRedirect: '/auth/failure',
    })
);

app.get('/auth/failure',(req, res) =>{
    res.status(400).send("Something went wrong....");
});

app.use("/auth/signup",signUp);
app.use("/auth/signin",signIn);

client.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('Connected to Database');
    }
});

app.listen(port, () => {
    console.log(`Server is running on the port: ${port}`);
});
