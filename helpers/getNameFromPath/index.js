const path = require("path");

const getNameFromPath = (filePath) => path.parse(filePath).base;

module.exports = getNameFromPath;
