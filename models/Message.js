const {Schema, model} = require('mongoose')

const schema = new Schema({
    owner: {type: String},
    id: {type: String},
    total: {type: Number},
    products: {type: Array},
    del: {type: String},
    timestamp: {type: String},
    street: {type: String},
    house: {type: String},
    note: {type: String},
    nameSurname: {type: String},
    courier: {type: String, default: ""}
})

module.exports = model('Mesage', schema)