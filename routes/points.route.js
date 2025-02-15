const {Router} = require('express')
const router = Router()
const Messages = require('../models/Message')

router.get('/', async (req, res)=> {
    try{
        const {user} = req.query
        const orderUser = await Messages.find({ owner: user })
        res.json(orderUser)
    }catch (error) {
        console.log(error)
    }
})

router.get('/all', async (req, res)=> {
    try{
        const orderUser = await Messages.find()
        res.json(orderUser)
    }catch (error) {
        console.log(error)
    }
})

module.exports = router