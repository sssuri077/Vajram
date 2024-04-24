const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const CustromerSchema = new mongoose.Schema({
    id: { type: Number },
    email: { type: String, unique: true },
    name: { type: String, default: '' },
    bod: { type: String, default: '' },
    gender: { type: String, default: '' },
    socialMediaAccount: { type: Array, default: '' },
    deleteStatus : { type: Number, default: 0 ,enum:[0,1] } //0-not delete 1-delete
}, { timestamps: true, versionKey: false })
CustromerSchema.plugin(AutoIncrement, { inc_field: 'id' });
module.exports = mongoose.model('CustromerSchema', CustromerSchema, 'Custromer')