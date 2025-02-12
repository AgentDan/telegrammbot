const {Router} = require('express')
const router = Router()
const Messages = require('../models/Message')

router.get('/', async (req, res)=> {
    console.log(req.body)
    try{
        const {user} = req.body
        const orderUser = await Messages.find({ owner: user })
        res.json(orderUser)
    }catch (error) {
        console.log(error)
    }
})

module.exports = router