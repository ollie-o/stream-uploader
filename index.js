const watch = require("node-watch");
const uuid = require("uuid").v4;

const getS3Buckets = require("./helpers/getS3Buckets");
const isTsFile = require("./helpers/isTsFile");

const FileUploader = require("./helpers/FileUploader");
const M3u8FileUploader = require("./helpers/M3u8FileUploader");
const TsFileUploader = require("./helpers/TsFileUploader");

const main = () => {
  const fileUploader = new FileUploader({
    buckets: getS3Buckets(),
    bucketDir: `public/${uuid()}`,
  });

  const tsFileUploader = new TsFileUploader({ seen: new Set(), fileUploader });
  const m3u8FileUploader = new M3u8FileUploader({ fileUploader });

  watch("./media/", { recursive: true }, (evt, name) => {
    if (evt !== "update") {
      return;
    }

    if (isTsFile(name)) {
      tsFileUploader.upload(name);
    } else {
      m3u8FileUploader.upload(name);
    }
  });
};

main();
