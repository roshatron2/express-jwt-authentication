var fs = require("fs");
var path = require("path");
var crypto = require("crypto");

// var key = "14189dc35ae35e75ff31d7502e245cd9bc7803838fbfd5c773cdcd79b8a28bbd";
// var cipher = crypto.createCipher("aes-256-cbc", key);
// var input = fs.createReadStream(__dirname + "/file.txt");
// var output = fs.createWriteStream(__dirname + "/test.txt.enc");

// input.pipe(cipher).pipe(output);

// output.on("finish", function () {
//   console.log("Encrypted file written to disk!");
// });

exports.encrypt = (directory, filename) => {
  var key = "14189dc35ae35e75ff31d7502e245cd9bc7803838fbfd5c773cdcd79b8a28bbd";
  var cipher = crypto.createCipher("aes-256-cbc", key);
  var input = fs.createReadStream(`${directory}/${filename}`);
  var output = fs.createWriteStream(`${directory}/${filename}.enc`);
  input.pipe(cipher).pipe(output);
  output.on("finish", function () {
    console.log("Encrypted file written to disk!");
  });
};

exports.deleteFile = (directory, filename) => {
  fs.unlinkSync(`${directory}/${filename}`);
};
