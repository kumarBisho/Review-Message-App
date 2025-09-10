import { create } from "domain";
import mongoose, {Schema, Document} from "mongoose";
import { Content } from "next/font/google";


 export interface Message extends Document{
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: [true, "Message content is required"],
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        readonly: true,        
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
        readonly: true,              
    }

})

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        minlength: 3,
        maxlength: 30,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email is invalid"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    verifyCode: {
        type: String,
        required: [true, "Verification code is required"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verification code expiry is required"],
    },
    isVerified: {
        type: Boolean,
        // required: [ true, "user varification is required"],
        default: false,
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true,
    },
    messages: {
        type: [MessageSchema],
        default: [],
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
        readonly: true,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
        readonly: true,
    },
})

const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User", UserSchema);
const MessageModel = mongoose.models.Message as mongoose.Model<Message> || mongoose.model<Message>("Message",  MessageSchema);

export default { UserModel, MessageModel};