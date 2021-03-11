
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const typeSchema = new Schema({

    user_id: {
        type: String,
        required: true,
    },
    name :{
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    }
})

const Type = mongoose.model("Type", typeSchema);

module.exports = Type;