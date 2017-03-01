const notFound = (res) => {
  return res.status(404).json({
    success: false,
    message: 'Document Not Found'
  })
};

module.exports = {
  notFound
};