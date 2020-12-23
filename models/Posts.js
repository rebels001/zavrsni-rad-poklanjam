const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    text: {
        type: String,
        required: true
    },
    tittle: {
        type: String,  
        required: true
    },
    imageUrl: {
        type: String,
    },
    itemLocation: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    name: {
        type: String
    },
    date: {
        type: Date,
        dafault: Date.now
    }
});

module.exports = Post = mongoose.model("post", PostSchema);