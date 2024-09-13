import express from "express"
import swaggerUI from "swagger-ui-express"
import swaggerJsDoc, { Options } from "swagger-jsdoc"
import { Auth } from "./routes/auth/auth";
import {connectDB} from "./services/DB"
import dotenv from "dotenv"
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Ringer Api docs',
        version: '1.0.0',
    },
};
const options: Options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/**/*.ts'],
}
const server = express()
const swaggerSpec = swaggerJsDoc(options);
connectDB()
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
server.use(Auth)
server.listen(8080, () => console.log("server is running"))