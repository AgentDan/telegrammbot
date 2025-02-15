const {Router} = require("express")
const router = Router()
const Products = require('./../models/Product')

router.post('/add', async (req, res)=>{
    try {
        const {own, name} = req.body
        const newProd = await new Products({
            own: own,
            name: name
        })
        await newProd.save()
        res.status(201).json({message: "Product added!!!"})
    } catch (error){
        return res.status(500).json({message: "MY ERROR"})
    }
})

module.exports = router