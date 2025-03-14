//imports env variables from .env file and exports them for use in other files
import dotenv from "dotenv";

dotenv.config({
    path: '../.env'
})

const env = process.env;

export default env;