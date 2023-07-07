const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');


const schema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
});

schema.methods.hashPassword = async function(){
    this.password = await bcrypt.hash(this.password, 10);
}

schema.methods.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = model('User', schema);



