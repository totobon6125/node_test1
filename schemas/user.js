import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ID: {
        type: String,
        required: true,
        unique: true
    },
    pw: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { versionKey: false }
);

userSchema.virtual("userId").get(function () { // _id를 userId로 "명칭"하겠다.
    return this._id.toHexString();
});

export default mongoose.model('user', userSchema);