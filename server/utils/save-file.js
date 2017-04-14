const Promise = require('bluebird');
const fseOutputfile = Promise.promisify(require('fs-extra').outputFile);
const path = require('path');


module.exports = function (fileData, validatedData) {
  if (!fileData) {
    return Promise.resolve(validatedData);
  }
  const buffer = new Buffer(fileData.buffer);
  const filename = `(${validatedData._id})__${fileData.filename}`;
  const filePath = path.resolve(
    './UploadedFiles/',
    `${validatedData.category}/${validatedData.subcategory || ''}/`,
    filename
  );
  return fseOutputfile(filePath, buffer)
    .then(() => {
      validatedData.filename = filename;
      return validatedData;
    });
};
