module.exports = (req, res, next) => {
  const currentTime = new Date().toISOString();
  const method = req.method;
  const route = req.originalUrl;

  console.log(`[${currentTime}] ${method} request to ${route}`);

  next();
};
