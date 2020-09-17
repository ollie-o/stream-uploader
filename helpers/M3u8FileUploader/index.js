const uuid = require("uuid").v4;

const execPromise = require("../execPromise");
const getNameFromPath = require("../getNameFromPath");
const sleepPromise = require("./helpers/sleepPromise");

const UPLOAD_DELAY = "10";

class M3u8FileUploader {
  constructor({ fileUploader }) {
    this.fileUploader = fileUploader;
    this.uploadCount = 0;
  }

  // Add time delay before uploading so the video files it references have time to
  // upload. Have to save into a tmp file to avoid getting overwritten.
  async upload(localPath) {
    const name = getNameFromPath(localPath);

    if (this.isFirstUpload()) {
      console.log(
        `View stream here:\n\n  ${this.fileUploader
          .getStreamUrls({ name })
          .join("\n\n  ")}`
      );
    }
    this.uploadCount++;

    const tmpFileName = `./tmp/${uuid()}.m3u8`;

    await execPromise(`cp ${localPath} ${tmpFileName}`);
    await sleepPromise(UPLOAD_DELAY);

    await this.fileUploader.upload({ localPath: tmpFileName, name });

    await execPromise(`rm ${tmpFileName}`);
  }

  isFirstUpload() {
    return !this.uploadCount;
  }
}

module.exports = M3u8FileUploader;
