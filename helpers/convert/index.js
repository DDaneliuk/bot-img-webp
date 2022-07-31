const imgFolder = './upload/';
const fs = require('fs');
const sharp = require('sharp')

async function convert() {
    let convertedDir = fs.readdirSync(imgFolder)
    for (const file of convertedDir) {
        console.log("[+] Start converting", file);
        await sharp(`./upload/${file}`)
            .resize({width: 1080})
            .webp({quality: 60})
            .toFile(`./res/${file.replace(/(\.jpg|.png)/gm, "")}.webp`)
            .catch(e => console.log('[-] Error while converting', e))
    }
}
module.exports = convert;
