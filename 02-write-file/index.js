const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;
const filePath = path.join(__dirname, 'text.txt');

fs.writeFile(filePath, '', (error) => {
    if (error) console.log(error.message);
});

console.log('Привет! Напишите что-нибудь');

stdin.on('data', data => {
    if (data.toString().replace(/\r?\n|\r/g, '') === 'exit') {
        sayBy();
    }

    process.on('SIGINT', function() {
        sayBy();
    });

    fs.appendFile(filePath, data.toString(), (error) => {
        if (error) console.log(error.message);
    });
});

const sayBy = () => {
    stdout.write('Всего доброго!');
    process.exit();
};