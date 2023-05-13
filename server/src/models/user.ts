import mongoose from "mongoose";
const { Schema } = mongoose

const userSchema = new Schema({
    email: {
        type: String,
        trim: true,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true,
        min: 5
    },

    stripeCustomerId: {
        type: String,
        require: true
    }
});

export default mongoose.model("User", userSchema);