const imgFolder = './res/';
const uploadFolder = './upload/';
const fs = require('fs');


async function cleanDirs() {
    fs.readdir(imgFolder, (err, files) => {
        files.forEach(file => {
            fs.unlinkSync(`${imgFolder}${file}`);
        })
    })
    fs.readdir(uploadFolder, (err, files) => {
        files.forEach(file => {
            fs.unlinkSync(`${uploadFolder}${file}`);
        })
    })
}

module.exports = cleanDirs;
