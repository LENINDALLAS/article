import jwt from "jsonwebtoken";

export const generateToken = user => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d"
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingsecret",
      (err, decode) => {
        if (err) {
          res.status(401).json(response({
            statusCode: 401,
            data: null,
            message: "Failed",
            error: "invalid token"
          }));
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).send(response({
      statusCode: 401,
      data: null,
      message: "Failed",
      error: "no token"
    })
);
  }
};

export const response = res => {

    const { statusCode, data, error, message} = res;
  return {
    statusCode,
    data,
    error,
    message
  };
};
