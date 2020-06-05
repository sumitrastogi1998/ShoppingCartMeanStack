const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let fileSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  price: {
    type: Number
  },
  counter: {
    type: Number,
    default: 0
  },
  isDisabled: {
    type: Boolean,
    default: true
  },
}, {
    collection: 'itemslist'
  })

module.exports = mongoose.model('ItemsList', fileSchema)