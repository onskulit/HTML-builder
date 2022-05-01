const fs = require("fs");
const path = require("path");

function copyDir() {
  const filesDirPath = path.join(__dirname, "files");
  const newDirPath = path.join(__dirname, "files-copy");

  fs.mkdir(newDirPath, (err) => {
    if (err && err.message.match(/already exists/)) {
      console.log("Folder updated");
    } else if (err) {
      console.log(err.message);
    } else {
      console.log("Directory created successfully");
    }

    fs.readdir(filesDirPath, (err, files) => {
      if (err) return console.log(err.message);
      for (let file of files) {
        fs.copyFile(
          path.join(filesDirPath, file),
          path.join(newDirPath, file),
          (err) => {
            if (err) return console.log(err.message);
          }
        );
      }
      console.log("Directory updated successfully");
    });
  });
}

copyDir();
