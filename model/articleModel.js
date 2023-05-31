import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string',
        required: true
    },
    owner: {
        type: 'string',
        required: true
    }
},
{
    timestamps: true
});

const Article = mongoose.model('Article', articleSchema);
export default Article;