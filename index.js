require("./configs/dotenv");
const express = require('express');
const cors = require('cors');
const {signIn, signUp} = require("./controllers/auth");
const { addMovie, updateMovie, deleteMovie } = require("./controllers/movie");
const { handleMovieIdParam } = require("./middlewares/moviemiddleware");
const { addTheatre, updateTheatre, deleteTheatre } = require("./controllers/theatre");
const { handleTheatreIdParam } = require("./middlewares/theatremiddleware");
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

app.param("movieId", handleMovieIdParam);
app.post("/auth/add", addMovie);
app.put("/auth/update/:movieId", updateMovie);
app.delete("/auth/delete/:movieId", deleteMovie);

app.param("theatreId", handleTheatreIdParam);
app.post("/auth/add", addTheatre);
app.put("/auth/update/:theatreId", updateTheatre);
app.delete("/auth/delete/:theatreId", deleteTheatre);

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
