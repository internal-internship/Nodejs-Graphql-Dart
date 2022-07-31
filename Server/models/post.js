const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postSchema = new schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}) 

const Post = mongoose.model("Post", postSchema);
module.exports = Post;