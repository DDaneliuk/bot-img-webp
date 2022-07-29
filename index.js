const TelegramBot = require('node-telegram-bot-api')
// helpers
const download = require('./helpers/download/index')
const checkDir = require("./helpers/check-dir");

const token = '5572752409:AAGwCEzpWBpcYDM_5XIxSnD8Gp3z1v44k_M'

const bot = new TelegramBot(token, { polling: true })

// command start
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome.\nTo start send one or more images or just send archive");
});

// Matches /images
bot.onText(/\/images/, (msg) => {
    const opts = {
        reply_markup: {
            keyboard: [
                ["Convert"],
            ],
            resize_keyboard: true,
            one_time_keyboard: false,
            force_reply: true,
        }
    };
    bot.sendMessage(msg.from.id, "Ok, send me images", opts);
});


// Handle callback queries
bot.on('callback_query', (callbackQuery) => {
    console.log("callbackQuery", callbackQuery)
    const message = callbackQuery.message;
    const data = callbackQuery.callback_data;
    console.log('data', data)
});

// Handle callback queries
bot.onText(/Convert/, async (msg) => {
    let isDirEmpty = await checkDir()
    if (isDirEmpty){
        bot.sendMessage(msg.from.id, "Sorry, send me a few images first!");
    } else{
        bot.sendMessage(msg.from.id, "Bear with me while I converting files...");
    }
    console.log(isDirEmpty, 'await checkDir()')
});

bot.on('photo', async (msg) => {
    console.log("msg", msg)
    await bot.sendMessage(msg.chat.id, "image/png");
    // here I'm getting the file url
    const fileURL = await bot.getFileLink(msg.photo[2].file_id);
    await download(msg.photo[2], fileURL)
})

bot.on('document', async (msg) => {
    // TODO save msg data for compare with comprised data
    console.log(msg.document)
    let fileType = msg.document.mime_type;
    switch (fileType) {
        case 'application/zip':
            await bot.sendMessage(msg.chat.id, "Sorry, now zip documents is not available");
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

bot.onText(/\/connect/, (msg) => {
    bot.sendMessage(msg.chat.id, "Connect.\nWrite smth to connect with admin.");
});
