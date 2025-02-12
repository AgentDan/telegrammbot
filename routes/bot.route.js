const TelegramBot = require('node-telegram-bot-api');
const {Router} = require("express");
const router = Router()
const Message = require('./../models/Message')

const token = process.env.TOKEN;
const webAppUrl = process.env.WEBAPP;

const bot = new TelegramBot(token, {polling: true});

router.post('/web-data', async (req, res) => {
    const {queryId, products = [], totalPrice, user, del} = req.body;
    try {

        const message = await new Message({
            owner: user,
            id: queryId,
            total: totalPrice,
            products: products,
            del: del
        })

        await message.save()

        await bot.answerWebAppQuery(queryId, {
            type: 'article',
            id: queryId,
            title: 'Успешная покупка',
            input_message_content: {
                message_text: ` Поздравляю с покупкой, вы приобрели товар на сумму ${totalPrice}, ${products.map(item => item.title).join(', ')} ID : ${queryId}`
            }
        })
        return res.status(200).json({});
    } catch (e) {
        return res.status(500).json({})
    }
})

module.exports = router