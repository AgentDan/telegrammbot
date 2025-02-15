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

router.post('/courier', async (req, res)=>{
    try {
        const {id, cor} = req.body
        const newCor = await Messages.find({id: req.body.id})
        newCor.cou
        await newCor.save()
    }catch (error){
        return res.status(500).json({message: "MY ERROR"})
    }
})

module.exports = router