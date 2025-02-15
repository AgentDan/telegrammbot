const {Router} = require('express')
const router = Router()
const Group= require('./../models/Group')

router.post('/add', async (req, res) => {
    try {
        const {name} = req.body
        const list = await new Group({
            nameGroup: name
        })
        await list.save()
        res.status(201).json({message: 'Group added!!'})
    } catch (error) {
        return res.status(500).json({message: "MY ERROR"})
    }
})

module.exports = router