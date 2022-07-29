const fs = require('fs');
const https = require('https');

async function download(document, fileURL){
    console.log('start download...')
    // create write stream
    const file = fs.createWriteStream(`./upload/${document.file_id}`);
    const request = https.get(fileURL, function(response) {
        response.pipe(file);
        // after download completed close filestream
        file.on("finish", () => {
            file.close();
            console.log("download completed!");
        });
    })
}
module.exports = download;
