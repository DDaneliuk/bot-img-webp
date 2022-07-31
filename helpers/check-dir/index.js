const fs = require('fs')
const dirname = './upload'

async function checkDir(){
    console.log('[+] Start checking dir')
    let isEmpty
    let checkDir = fs.readdirSync(dirname)
    if (!checkDir.length) {
        isEmpty = true
        console.log("[-] Dir is empty")
    } else {
        isEmpty = false
        console.log("[+] Files in dir:", checkDir.length)
    }
    return isEmpty
}

module.exports = checkDir;
