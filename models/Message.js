const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    // owner: {type: Types.ObjectId, ref: 'User'},
    id: {type: String},
    text: {type: String},
    user: {type: String}
    // completed: false,
    // important: false
})

module.exports = model('Mesage', schema)