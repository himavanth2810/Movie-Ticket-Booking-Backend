const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../configs/db");

exports.signUp = (req,res) => {

  const {name,email,password} = req.body;
  
  client.query(`SELECT * FROM users WHERE email = '${email}';`)
  .then((data) => {
    isValid = data.rows;
    if(isValid.length !== 0) {
      res.status(400).json({
        error: "User already exists",
      });
    }
    else{
      bcrypt.hash(password,10,(err, hash) => {
         if(err){
           res.status(500).json({
             error:"Internal Server Error",
           });
         }
         const user ={
           name,
           email,
           password : hash,
         };

        client.query(`INSERT INTO users (name, email, password) VALUES ('${user.name}', '${user.email}', '${user.password}');`
        )
        .then((data) => {
          const token = jwt.sign(
            {
              email : email,
            },
            process.env.SECRET_KEY
          );

          res.status(200).json({
            message: "User added successfully to database",
            token: token,
          });
        })
        .catch((err) => {
          res.status(500).json({
            error:"Database error occurred!",
          });
        });
      });
    }
  })
  .catch((err)=>{
    res.status(500).json({
      error: "Database error occurred!",
    });
  });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;

  client
    .query(`SELECT * FROM users WHERE email = '${email}';`)
    .then((data) => {
      userData = data.rows;
      if (userData.length === 0) {
        res.status(400).json({
          error: "User does not exist, signup instead!",
        });
      } else {
        bcrypt.compare(password, userData[0].password, (err, result) => {
          if (err) {
            res.status(500).json({
              error: "Server error!",
            });
          } else if (result === true) {
            const token = jwt.sign(
              {
                email: email,
              },
              process.env.SECRET_KEY
            );
            res.status(200).json({
              message: "User signed in successfully",
              token: token,
            });
          } else {
            res.status(400).json({
              error: "Enter correct password!",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: "Database error occurred!",
      });
    });
};

/*exports.addMovie = (req,res) => {

  const {title,language,description} = req.body;
  
  client.query(`SELECT * FROM movies WHERE title = '${title}';`)
  .then((data) => {
    isValid = data.rows;
    if(isValid.length !== 0) {
      res.status(400).json({
        error: "Movie already exists",
      });
    }
    else{
         if(err){
           res.status(500).json({
             error:"Internal Server Error",
           });
         }
         const movie ={
           title,
           language,
           description,
         };

        client.query(`INSERT INTO movies (title, language, description) VALUES ('${movie.title}', '${movie.language}', '${movie.description}');`
        )
        .then((data) => {
          const movie_token = jwt.sign(
            {
              title : title,
            },
            process.env.SECRET_MOVIE_KEY
          );

          res.status(200).json({
            message: "Movie added successfully to database",
            token: movie_token,
          });
        })
        .catch((err) => {
          res.status(500).json({
            error:"Database error occurred!",
          });
        });
    }
  })
  .catch((err)=>{
    res.status(500).json({
      error: "Database error occurred!",
    });
  });
};

exports.addTheatre = (req,res) => {

  const {name,screens,place} = req.body;
  
  client.query(`SELECT * FROM theatres WHERE name = '${name}' AND place = '${place}';`)
  .then((data) => {
    isValid = data.rows;
    if(isValid.length !== 0) {
      res.status(400).json({
        error: "Theatre already exists",
      });
    }
    else{
         if(err){
           res.status(500).json({
             error:"Internal Server Error",
           });
         }
         const theatre ={
           name,
           screens,
           place,
         };

        client.query(`INSERT INTO theatres (name, screens, place) VALUES ('${theatre.name}', '${theatre.screens}', '${theatre.place}');`
        )
        .then((data) => {
          const theatre_token = jwt.sign(
            {
              title : title,
            },
            process.env.SECRET_THEATRE_KEY
          );

          res.status(200).json({
            message: "Theatre added successfully to database",
            token: theatre_token,
          });
        })
        .catch((err) => {
          res.status(500).json({
            error:"Database error occurred!",
          });
        });
    }
  })
  .catch((err)=>{
    res.status(500).json({
      error: "Database error occurred!",
    });
  });
};*/
