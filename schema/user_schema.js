import { model, Schema } from "mongoose";

const userSchema = new Schema({
    uuid: { type: String, required: true, unique: true, index: true },
    username: { type: String, required: true, unique: true, index: true },
    firts_name: { type: String, default: "" },
    last_name: { type: String, default: "" },
    email: { type: String, default: "" },
    password: { type: String, required: true},
    notification: [{ type: Object }],
    activity: [{ type: Object }],
    type: { type: String, default: "user" },
});


export default model('User', userSchema);
