const {Schema, model} = require("mongoose")

const schema = new Schema ({
    own: {type: String},
    name: {type: String}
})

module.exports = model('Product', schema)