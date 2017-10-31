const mongoose = require('mongoose')
const Schema = mongoose.Schema

var TipSchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },

    body: { type: String, required: true },
    location: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

TipSchema.pre('save', function(next) {
    var now = new Date()
    this.updatedAt = now
    if ( !this.createdAt ) {
        this.createdAt = now
    }
    next()
})

module.exports = mongoose.model('Tip', TipSchema)
