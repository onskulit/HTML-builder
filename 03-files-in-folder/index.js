const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const secretFolderPath = path.join(__dirname, 'secret-folder');

fs.readdir(secretFolderPath, {withFileTypes: true}, (error, files) => {
    if (error) console.log(error.message);
    for (let dirent of files) {
        if (!dirent.isFile()) continue;
        const absolutePath = path.join(__dirname, 'secret-folder', dirent.name);
        const fileName = path.parse(absolutePath).name;
        const fileExtention = path.extname(absolutePath);
        fs.stat(absolutePath, (error, stats) => {
            if (error) console.log(error.message);
            const fileSize = stats.size / 1024 + 'kb';
            console.log(`${fileName} - ${fileExtention} - ${fileSize}`);
        })
    }
});