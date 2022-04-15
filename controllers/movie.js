const client = require("../configs/db");

exports.addMovie = (req, res) => {
  const { title, language, description} = req.body;
  client
    .query(
      `INSERT INTO movies (title, language, description) VALUES ('${title}' , '${language}', '${description}');`
    )
    .then((data) => {
      res.status(200).json({
        message: "Movie added successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "Database error occured",
      });
    });
};

exports.updateMovie = (req, res) => {
  const movieId = req.movieId;
  const { title, language, description } = req.body;
  client
    .query(
      `UPDATE movies SET title='${title}' , language='${language}' , description='${description}' WHERE movieid='${movieId}'`
    )
    .then((data) => {
      res.status(200).json({
        message: "Success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "Database error occured",
      });
    });
};

exports.deleteMovie = (req, res) => {
  const movieId = req.params.movieId;
  client
    .query(`DELETE FROM movies WHERE movieId ='${movieId}'`)
    .then((data) => {
      res.status(200).json({
        message: "Movie deleted successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        "message": "Database error occured",
      });
    });
};