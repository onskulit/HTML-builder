const fs = require("fs");
const path = require("path");

const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

fs.writeFile(bundlePath, '', (err) => {
    if (err) console.log(err.message);

    fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
        if (err) return console.log(err.message);

        fs.writeFile(bundlePath, '', (err) => {
            if (err) console.log(err.message);
        });

        for (let dirent of files) {
            if (!dirent.isFile()) continue;
            const absolutePath = path.join(__dirname, 'styles', dirent.name);
            if (path.extname(absolutePath) !== '.css') continue;

            fs.readFile(path.join(__dirname, 'styles', dirent.name), (err, data) => {
                if (err) return console.log(path.join(__dirname, 'styles', dirent.name));
                fs.appendFile(bundlePath, data.toString(), (err) => {
                    if (err) console.log(err.message);
                });
            })
        }
    });
});