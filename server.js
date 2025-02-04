const express = require("express")
const app = express()
const TelegramBot = require('node-telegram-bot-api');
const async_hooks = require("node:async_hooks");
const path = require("path");
const webAppUrl = 'https://ya.ru'

const dotenv = require("dotenv").config()

const PORT = process.env.PORT
const token = process.env.TOKEN

const bot = new TelegramBot(token, {polling: true});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text

    if (text === '/start') {
        await bot.sendMessage(chatId, 'Ниже появится кнопка, заполни форму', {
            reply_markup: {
                keyboard: [
                    [{text: 'Заполни форму', web_app: {url: webAppUrl}}]
                ]
            }
        })
    }
    await bot.sendMessage(chatId, 'Ниже появится кнопка, заполни форму', {
        reply_markup: {
            inline_keyboard: [
                [{text: 'Сделать заказ', web_app: {url: webAppUrl}}]
            ]
        }
    })

});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, './client/dist')));
    app.get('*', (req, res) =>
        res.sendFile(
            path.resolve(__dirname, './client/dist/index.html')
        )
    );
} else {
    app.get('/', (req, res) => res.send('Please set to production'));
}

app.listen(PORT, () => console.log(`Server started on port : ${PORT}`))
