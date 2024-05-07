import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    BlogType: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    Blogimg: {
        type: String,
        required: true
    },
    BlogDesc: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);
export default Post;
