import env from './vars/env.js';
import app from './app.js';
import { apiTest } from "./connections/campmonitor.connection.js";
const PORT = 80;

apiTest
    .then(() => {
        console.log("Connected to Camp Monitor API");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch((err) => {
        console.error("Error connecting to Camp Monitor API", err);
    })
