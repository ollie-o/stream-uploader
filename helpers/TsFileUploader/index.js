const getNameFromPath = require("../getNameFromPath");

class TsFileUploader {
  constructor({ seen, fileUploader }) {
    this.seen = seen;
    this.fileUploader = fileUploader;
  }

  upload(localPath) {
    if (!this.seen.has(localPath)) {
      this.seen.add(localPath);
      return;
    }

    return this.fileUploader.upload({
      localPath,
      name: getNameFromPath(localPath),
    });
  }
}

module.exports = TsFileUploader;
