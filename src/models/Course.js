const {Schema, model} = require('mongoose');


module.exports = model('Course', new Schema({
    _id: {
        type: String,
        required: true,
        alias: 'code',
        uppercase: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: 'This is a description'
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'Student'
    }]

}));

