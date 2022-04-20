exports.handleTheatreIdParam = (req, res, next, id) => {
    req.theatreId = id;
    next();
  };