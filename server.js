const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const cors = require('cors');
const path = require("path");
const dotenv = require('dotenv').config()
const connectDB = require("./config/db")

connectDB()

const token = process.env.TOKEN;
const webAppUrl =process.env.WEBAPP;

const bot = new TelegramBot(token, {polling: true});
const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json({extended: true}));
app.use(cors());
app.use('/api/auth', require('./routes/auth.route'))

app.use('/api/bot', require('./routes/bot.route'))
app.use('/api/points', require('./routes/points.route'))
app.use('/api/cur', require('./routes/curiers.route'))
app.use('/api/prod', require('./routes/products.route'))
app.use('/api/group', require('./routes/group.route'))

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        await bot.sendMessage(chatId, 'Заходи в наш интернет магазин по кнопке ниже', {
            reply_markup: {
                keyboard: [
                    [{text: 'Заполни форму', web_app: {url: webAppUrl + '/form'}}]
                ],
                resize_keyboard: true
            }
        })
    }

    if (text === '/admin' && msg.from.username === 'danilravil'){
        await bot.sendMessage(chatId, 'Вы администратор!!!')
    } else if (text === '/admin' && msg.from.username !== 'danilravil'){
        await bot.sendMessage(chatId, 'Вы пользователь!!!! Не лезь сюда')
    }

    if(msg?.web_app_data?.data) {
        try {
            const data = JSON.parse(msg?.web_app_data?.data)
            await bot.sendMessage(chatId, 'Спасибо за обратную связь!')
            await bot.sendMessage(chatId, 'Ваша страна: ' + data?.country);
            await bot.sendMessage(chatId, 'Ваша улица: ' + data?.street);
            await bot.sendMessage(chatId, 'ID : ' + chatId);
            await bot.sendMessage(chatId, 'User : ' + msg.from.username);

            setTimeout(async () => {
                await bot.sendMessage(chatId, 'Всю информацию вы получите в этом чате');
            }, 5000)
        } catch (e) {
            console.log(e);
        }
    }
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

app.listen(PORT, () => console.log('server started on PORT ' + PORT))