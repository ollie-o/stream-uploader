const qs = require("query-string");

const { execPromise } = require("../../helpers/execPromise");

const VIEWER_URL = "https://ollie-o.com/stream-viewer";

class FileUploader {
  constructor({ buckets, bucketDir }) {
    this.buckets = buckets;
    this.bucketDir = bucketDir;
  }

  upload({ localPath, name }) {
    const uploads = [];

    for (const { uri } of this.buckets) {
      uploads.push(
        execPromise(`aws s3 cp ${localPath} ${this.getS3Uri({ uri, name })}`)
      );
    }

    // Wait for uploads to finish
    return Promise.all(uploads);
  }

  getS3Uri({ uri, name }) {
    return `${uri}/${this.bucketDir}/${name}`;
  }

  getStreamUrls({ name }) {
    return this.buckets.map(
      ({ endpoint }) =>
        `${VIEWER_URL}?` +
        qs.stringify({ url: `${endpoint}/${this.bucketDir}/${name}` })
    );
  }
}

module.exports = FileUploader;
