const execPromise = require("../../../execPromise");

const sleepPromise = (numSeconds) => execPromise(`sleep ${numSeconds}s`);

module.exports = sleepPromise;
