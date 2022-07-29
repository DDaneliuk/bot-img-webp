const fs = require('fs');

async function checkDir(document, fileURL){
    console.log('start checking dir...')
    let isEmpty = true
    const dirname = './upload'
    fs.readdir(dirname, function(err, files) {
        if (err) {
           console.log("Error when checking error", err)
        } else {
            if (!files.length) {
                isEmpty = true
                console.log("Dir is empty")
            }
            else {
                isEmpty = false
            }
        }
    });
    return isEmpty
}
module.exports = checkDir;
