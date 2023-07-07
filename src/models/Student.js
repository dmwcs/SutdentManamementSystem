const {Schema,model}= require('mongoose');
//这里官方推荐Joi大写
const Joi = require('joi');

const studentSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 10,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: [
            {
                validator: (email) => {
                    return Joi.string().email().validate(email).error === undefined;
                },
                msg : 'Invalid email format'
            }
        ]
    },
    courses: [
        {
            //Follow course id 的类型
            type: String,
            ref: 'Course',
        }
    ]
});

const Student = model('Student', studentSchema);

module.exports = Student;






