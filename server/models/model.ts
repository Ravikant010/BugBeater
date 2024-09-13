import { model, Schema } from "mongoose";
import { IUser } from "../types/type";

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    full_name: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'non-binary', 'prefer not-to-say'], required: true },
    phone: { type: String },
    profile: { type: String },
    country: { type: String },
    preferred_language: { type: String },
    bio: { type: String },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    registrationDate: { type: Date, default: Date.now },
    lastLoginDate: { type: Date },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    interests: [{ type: String }]
  });
export const User = model("users", UserSchema)