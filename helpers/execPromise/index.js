const exec = require("child_process").exec;

const execPromise = (cmd) =>
  new Promise((resolve, reject) =>
    exec(cmd, (err, stdout) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(stdout);
        resolve(stdout);
      }
    })
  );

module.exports = execPromise;
