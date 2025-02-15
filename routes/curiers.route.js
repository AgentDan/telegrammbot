const {Router} = require('express')
const router = Router()
const Cur= require('../models/Cur')

router.post('/add', async (req, res) => {
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

module.exports = router