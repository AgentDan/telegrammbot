const {Router, json} = require('express')
const router = Router()
const Cur= require('../models/Cur')

router.post('/add', async (req, res) => {
    console.log(req.body.cur)

    try {
        const {cur, nic, telephone} = req.body
        const list = await new Cur({
            cur: cur,
            nic: nic,
            telephone: telephone
        })
        console.log(list)
        await list.save()
        res.status(201).json({message: 'Курьер добавлен'})
    } catch (error) {
        return res.status(500).json({message: "MY ERROR"})
    }
})

router.get('/all', async (req, res)=>{
    try {
        const couriers = await Cur.find()

        res.json(couriers)
    }catch (error){
        res.status(500).json({message: "MY ERROR"})
    }
})

router.delete('/delete/:id', async (req, res)=>{
    try {
        console.log(req.params.id)
        const couriers = await Cur.findByIdAndDelete(req.params.id)
        res.json(couriers)
    }catch (error){
        res.status(500).json({message: "My error!!!"})
    }
})
module.exports = router