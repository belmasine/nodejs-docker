const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        require: ["true", "required field"]
    },
    body: {
        type: String,
        require: ["true", "required field"]
    },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;