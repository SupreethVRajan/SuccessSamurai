import mongoose from "mongoose";
const { Schema } = mongoose

const articleSchema = new Schema({
    title: {
        type: String,
        require: true,
    },

    imageUrl: {
        type: String,
        require: true,
    },

    content: {
        type: String,
        require: true
    },

    access: {
        type: String,
        enum: ["Basic", "Gold", "Platinum"],
        require: true
    }
});

export default mongoose.model("Article", articleSchema);