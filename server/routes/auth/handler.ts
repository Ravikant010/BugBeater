
import bcrypt from "bcrypt"
import { z } from 'zod';
import { User } from "../../models/model";
import { IUser } from "../../types/type";
import { Request, Response } from "express";
import { Error } from "mongoose";
// Define the Zod schema
const userSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  full_name: z.string().min(1, 'Full name is required'),
  gender: z.enum(['male', 'female', 'non-binary', 'prefer not-to-say']).optional(),
  phone: z.string().optional(),
  profile: z.string().optional(),
  country: z.string().optional(),
  preferred_language: z.string().optional(),
  bio: z.string().optional(),
  interests: z.array(z.string()).optional(),
});

// Function to create a new user
async function createUser(userData: any): Promise<IUser> {
  // Parse and validate the user data
  const parsedData = userSchema.parse(userData);

  const {
    username,
    email,
    password,
    full_name,
    gender,
    phone,
    profile,
    country,
    preferred_language,
    bio,
    interests
  } = parsedData;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create and save the new user
  const new_user: IUser = new User({
    username,
    email,
    password: hashedPassword,
    full_name,
    gender,
    phone,
    profile,
    country,
    preferred_language,
    bio,
    interests,
    registrationDate: new Date(),
    lastLoginDate: null,
    posts: [],
    friends: [],
    followers: [],
    following: []
  });
  return new_user;
}



  export const CreateUserHandler = async (req: Request, res: Response) => {
    try {
      // Call the createUser function
      const newUser = await createUser(req.body);
      
      // Send success response
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error:any) {
      if (error instanceof z.ZodError) {
        console.log(error)
        // Handle Zod validation errors
        return res.status(400).json({ errors: error.errors });
      }
      
      if (error.message === 'User already exists') {
        // Handle user already exists error
        return res.status(400).json({ message: error.message });
      }
      
      // Handle other errors
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Server error' });
    }
  }
  