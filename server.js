const express = require("express")
const app = express()
const TelegramBot = require('node-telegram-bot-api');

const dotenv = require("dotenv").config()

const PORT = process.env.PORT
const token = process.env.TOKEN

const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'I LOVE YOU BABY !!!');
});

app.listen(PORT, ()=> console.log(`Server started on port : ${PORT}`))
