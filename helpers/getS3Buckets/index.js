const BUCKETS = {
  na: {
    uri: "",
    endpoint: "",
  },
  au: {
    uri: "",
    endpoint: "",
  },
};
const VALID_REGIONS = new Set(Object.keys(BUCKETS));
const ERROR_MSG = `Must provide region. Allowed regions are ${[
  ...VALID_REGIONS,
]}`;

const getS3Buckets = () => {
  const regions = process.argv.slice(2);

  if (
    !regions.length ||
    !regions.every((region) => VALID_REGIONS.has(region))
  ) {
    throw Error(ERROR_MSG);
  }

  return regions.map((region) => BUCKETS[region]);
};

module.exports = getS3Buckets;
