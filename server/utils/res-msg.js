const notFound = (res, message) => {
  return res.status(404).json({
    success: false,
    message: message
  });
};

module.exports = {
  notFound
};