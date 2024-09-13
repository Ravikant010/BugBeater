import express from 'express';
import {CreateUserHandler} from "./handler"
export const Auth = express.Router();

/**
 * @openapi
 * /login:
 *   get:
 *     tags:
 *       - user auth
 *     summary: "Logs user into the system"
 *     description: "Logs user into the system using the provided username and password."
 *     parameters:
 *       - name: username
 *         in: query
 *         description: "The user name for login"
 *         required: false
 *         schema:
 *           type: string
 *       - name: password
 *         in: query
 *         description: "The password for login in clear text"
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: "Successful login"
 *         headers:
 *           X-Rate-Limit:
 *             description: "Calls per hour allowed by the user"
 *             schema:
 *               type: integer
 *               format: int32
 *           X-Expires-After:
 *             description: "Date in UTC when token expires"
 *             schema:
 *               type: string
 *               format: date-time
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       '400':
 *         description: "Invalid username/password supplied"
 */
Auth.get('/login', (req, res) => res.send("ok"));



  /**
 * @openapi
 * /sign-up:
 *   post:
 *     summary: Create a new user account
 *     description: This endpoint creates a new user account. User data is validated using Zod and any existing user with the same email will be rejected.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: strongpassword123
 *               full_name:
 *                 type: string
 *                 description: The full name of the user
 *                 example: John Doe
 *               gender:
 *                 type: string
 *                 description: The gender of the user
 *                 enum: [male, female, non-binary, prefer not-to-say]
 *                 example: male
 *               phone:
 *                 type: string
 *                 description: The phone number of the user
 *                 example: +1234567890
 *               profile:
 *                 type: string
 *                 description: The profile picture URL of the user
 *                 example: http://example.com/profile.jpg
 *               country:
 *                 type: string
 *                 description: The country of the user
 *                 example: USA
 *               preferred_language:
 *                 type: string
 *                 description: The preferred language of the user
 *                 example: English
 *               bio:
 *                 type: string
 *                 description: A short bio of the user
 *                 example: Software developer and tech enthusiast.
 *               interests:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: A list of interests of the user
 *                 example: ["technology", "gaming"]
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully

 *       400:
 *         description: Invalid input or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User already exists
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: Username is required
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Server error
 */
Auth.post('/sign-up',CreateUserHandler);
