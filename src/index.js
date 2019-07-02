var glob = require("glob")

// options is optional
glob("*", function (er, files) {
    console.log(files);
})