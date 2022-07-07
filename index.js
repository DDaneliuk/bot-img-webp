const fs = require('fs');
const https = require('https');
const TelegramBot = require('node-telegram-bot-api')
// helpers
const download = require('./helpers/download/index')

const token = '5572752409:AAGwCEzpWBpcYDM_5XIxSnD8Gp3z1v44k_M'

const bot = new TelegramBot(token, { polling: true })

// command start
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome.\nTo start send one or more images or just send archive");
});

bot.on('document', async (msg) => {
    // TODO save msg data for compare with comprised data
    console.log(msg.document)
    let fileType = msg.document.mime_type;
    switch (fileType) {
        case 'application/zip':
            await bot.sendMessage(msg.chat.id, "application/zip");
            break
        case 'image/png':
            await bot.sendMessage(msg.chat.id, "image/png");
            // here I'm getting the file url
            const fileURL = await bot.getFileLink(msg.document.file_id);
            await download(msg.document, fileURL)
            break
        default:
            bot.sendMessage(msg.chat.id, "I dont support this file type");
    }

});
