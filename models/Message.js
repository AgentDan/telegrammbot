const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    // owner: {type: Types.ObjectId, ref: 'User'},
    owner: {type: String},
    id: {type: String},
    total: {type: Number},
    products: {type: Array},
    del: {type: String},
    timestamp: {type: String},
    street: {type: String},
    house: {type: String},
    note: {type: String},
    nameSurname: {type: String}
})

module.exports = model('Mesage', schema)