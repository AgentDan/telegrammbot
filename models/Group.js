const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    // owner: {type: Types.ObjectId, ref: 'User'},
    nameGroup: {type: String},
})

module.exports = model('Group', schema)