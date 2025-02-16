const {Router, json} = require('express')
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

router.put('/courier/:id', async (req, res)=>{
    console.log("ID : ", req.params.id)
    console.log("name : " , req.body.name)
    try {
        const {id} = req.params
        const {name} = req.body
        const newcor = await Messages.findOne({_id: id})
        newcor.courier = name
        await newcor.save()
        res.json(newcor)
    }catch (error){
        return res.status(500).json({message: "MY ERROR"})
    }
})

module.exports = router