const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hero = new Schema({
    name:{
        type: String,
        required: true
    },
    todo: {
        type: String,
        required: true
    },
    nottodo: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: false
    }
});
mongoose.model('hero', hero);
