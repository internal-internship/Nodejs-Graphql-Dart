const mongoose = require("mongoose");
const schema = mongoose.Schema;

const socialMediaSchema = new schema({
    media: [
        {
            name: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    belongsTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
    }
});

const SocialMedia = mongoose.model("SocialMedia", socialMediaSchema);
module.exports = SocialMedia;
