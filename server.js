const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
const path = require("path");
const dotenv = require('dotenv').config()

const token = '7802370888:AAHrN4NouoeOj3bkNOs4eOA11LmgibOzzRs';
const webAppUrl = 'web3ddd.com';

const bot = new TelegramBot(token, {polling: true});
const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cors());

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if(text === '/start') {
        await bot.sendMessage(chatId, 'Ниже появится кнопка, заполни форму', {

        })
    // if(text === '/start') {
    //     await bot.sendMessage(chatId, 'Ниже появится кнопка, заполни форму', {
    //         reply_markup: {
    //             keyboard: [
    //                 [{text: 'Заполнить форму', web_app: {url: webAppUrl + '/form'}}]
    //             ]
    //         }
    //     })

        await bot.sendMessage(chatId, 'Заходи в наш интернет магазин по кнопке ниже', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Сделать заказ', web_app: {url: webAppUrl}}]
                ]
            }
        })
    }

    if(msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data)
            console.log(data)
            await bot.sendMessage(chatId, 'Спасибо за обратную связь!')
            await bot.sendMessage(chatId, 'Ваша страна: ' + data?.country);
            await bot.sendMessage(chatId, 'Ваша улица: ' + data?.street);

            setTimeout(async () => {
                await bot.sendMessage(chatId, 'Всю информацию вы получите в этом чате');
            }, 3000)
        } catch (e) {
            console.log(e);
        }
    }
});

app.post('/web-data', async (req, res) => {
    const {queryId, products = [], totalPrice} = req.body;
    try {
        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Успешная покупка',
            input_message_content: {
                message_text: ` Поздравляю с покупкой, вы приобрели товар на сумму ${totalPrice}, ${products.map(item => item.title).join(', ')}`
            }
        })
        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
})

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

app.listen(PORT, () => console.log('server started on PORT ' + PORT))