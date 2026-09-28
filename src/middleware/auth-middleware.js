const protect = (req, res, next) => {
  const { user } = req.session;
  if (!user) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    return next(error);
  }

  req.user = user;
  next();
};

export default protect;
