import {Schema} from "mongoose"
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    full_name: string;
    gender: 'male' | 'female' | 'non-binary' | 'prefer not-to-say';
    phone?: string;
    profile?: string;
    country?: string;
    preferred_language?: string;
    bio?: string;
    posts: Schema.Types.ObjectId[];
    registrationDate: Date;
    lastLoginDate?: Date;
    friends: Schema.Types.ObjectId[];
    followers: Schema.Types.ObjectId[];
    following: Schema.Types.ObjectId[];
    interests: string[];
  }