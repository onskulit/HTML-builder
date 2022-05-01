const fs = require('fs');
const path = require('path');
const textPath = path.resolve(__dirname + '/text.txt');
const { stdin, stdout } = process;

const readStream = fs.createReadStream(textPath);

readStream.on('data', (chunk) => {
    stdout.write(chunk.toString());
});