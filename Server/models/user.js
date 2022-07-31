const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    socialMedia: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "SocialMedia",
        default: null,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ]
});

const User = mongoose.model("User", userSchema);
module.exports = User;
