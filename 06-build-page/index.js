const fs = require("fs");
const path = require("path");
const ptojectDistPath = path.join(__dirname, 'project-dist');
const indexHTMLFilePath = path.join(ptojectDistPath, 'index.html');
const styleCSSPath = path.join(__dirname, 'project-dist', 'style.css');
const assetsFolderPath = path.join(__dirname, 'project-dist', 'assets');

function createDistFolder() {
    fs.mkdir(ptojectDistPath, (err) => {
        if (err && err.message.match(/already exists/)) return console.log("Folder updated");
        if (err) return console.log(err.message);
    });
    createIndexHTML();
    createStyleCSS();
    createAssetsFolder();
}

function createIndexHTML() {
    fs.copyFile(path.join(__dirname, 'template.html'), indexHTMLFilePath, (err) => {
          if (err) return console.log(err.message);
          updateIndexHTML();
        }
    );
}

function updateIndexHTML() {
    fs.readdir(path.join(__dirname, 'components'), (err, files) => {
        if (err) return console.log(err.message);

        fs.readFile(indexHTMLFilePath, (err, data) => {
            if (err) return console.log(err.message);
            data = data.toString();
            for (let file of files) {
                const absoluteFilePath = path.join(__dirname, 'components', file);
                fs.readFile(absoluteFilePath, (err, fileData) => {
                    if (err) return console.log(err.message);
                    data = data.replace(`{{${path.parse(absoluteFilePath).name}}}`, fileData);
                    fs.writeFile(indexHTMLFilePath, data, err => {
                        if (err) return console.log(err.message);
                    });
                })
            }
        })
    });
}

function createStyleCSS() {
    fs.writeFile(styleCSSPath, '', (err) => {
        if (err) console.log(err.message);
    
        fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
            if (err) return console.log(err.message);
    
            fs.writeFile(styleCSSPath, '', (err) => {
                if (err) console.log(err.message);
            });
    
            for (let dirent of files) {
                if (!dirent.isFile()) continue;
                const absolutePath = path.join(__dirname, 'styles', dirent.name);
                if (path.extname(absolutePath) !== '.css') continue;
    
                fs.readFile(path.join(__dirname, 'styles', dirent.name), (err, data) => {
                    if (err) return console.log(path.join(__dirname, 'styles', dirent.name));
                    fs.appendFile(styleCSSPath, data.toString(), (err) => {
                        if (err) console.log(err.message);
                    });
                })
            }
        });
    });
}

function createAssetsFolder() {
    fs.mkdir(assetsFolderPath, (err) => {
        if (err && err.message.match(/already exists/)) return console.log("Assets folder updated");
        if (err) return console.log(err.message);
    });
    updateAssetsFolder();
}

function updateAssetsFolder() {
    fs.readdir(path.join(__dirname, 'assets'), {withFileTypes: true}, (err, files) => {
        if (err) return console.log(err.message);
        for (let dirent of files) {
            fs.mkdir(path.join(assetsFolderPath, dirent.name), {recursive: true}, err => {
                if (err) return console.log(err.message);
            });

            fs.readdir(path.join(__dirname, 'assets', dirent.name), (err, attachedFiles) => {
                if (err) return console.log(err.message);
                for (let attachedFile of attachedFiles) {
                    fs.copyFile(path.join(__dirname, 'assets', dirent.name, attachedFile), path.join(assetsFolderPath, dirent.name, attachedFile), err => {
                        if (err) return console.log(err.message);
                    });
                }
            });
        }
    })
}

createDistFolder();