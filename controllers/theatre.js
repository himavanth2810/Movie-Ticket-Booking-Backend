const client = require("../configs/db");

exports.addTheatre = (req, res) => {
  const { city, theatreName} = req.body;
  client
    .query(
      `INSERT INTO theatres (city, theatreName) VALUES ('${city}' , '${theatreName}');`
    )
    .then((data) => {
      res.status(200).json({
        message: "Theatre added successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "Database error occured",
      });
    });
};

exports.updateTheatre = (req, res) => {
  const theatreId = req.theatreId;
  const { city, theatreName } = req.body;
  client
    .query(
      `UPDATE theatres SET city='${city}' , theatreName='${theatreName}' WHERE theatreId='${theatreId}'`
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

exports.deleteTheatre = (req, res) => {
  const theatreId = req.params.theatreId;
  client
    .query(`DELETE FROM theatres WHERE theatreId ='${theatreId}'`)
    .then((data) => {
      res.status(200).json({
        message: "Theatre deleted successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        "message": "Database error occured",
      });
    });
};