const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    cur: {type: String},
    nic: {type: String},
    telephone: {type: String}
})

module.exports = model('Cur', schema)