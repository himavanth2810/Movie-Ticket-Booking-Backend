exports.handleMovieIdParam = (req, res, next, id) => {
    req.movieId = id;
    next();
  };