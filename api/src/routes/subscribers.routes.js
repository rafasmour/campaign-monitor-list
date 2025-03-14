// routes for managing subscribers
import { Router } from 'express';
import axios from "axios";
import { apiURL, axiosConfig } from "../connections/campmonitor.connection.js";
import env from "../vars/env.js";

const router = new Router();
const listID = env.CAMPMONITOR_LIST_ID;
router.route('/').get(async (req, res)=> {
    try {
        const apiReq = axios.get(
            apiURL + `/lists/${listID}/active.json`,
            axiosConfig
        );
        const apiRes = await apiReq;
        const data = apiRes.data;
        const subscribers = data.Results;
        console.log(subscribers);
        res.json(JSON.stringify(subscribers));
    } catch (error) {
        console.error(error);
        res.json(error.message);
    }
})

router.route('/import').post(async (req, res)=> {
    try {
        const subscriber = req.body;
        console.log(subscriber);
        if(!subscriber.EmailAddress || !subscriber.Name){
            throw new Error("Subscriber must have an email address and name");
        }
        const apiReq = axios.post(
            apiURL + `/subscribers/${listID}.json`,
            JSON.stringify(subscriber),
            axiosConfig
        )
        const apiRes = await apiReq;

        res.json(apiRes.data);
    } catch (error) {
        res.json(error.message);
    }

})

router.route('/delete').delete(async (req, res) => {
    try {
        const subEmail = req.body;
        console.log(subEmail)
        if(!subEmail){
            throw new Error("No email provided");
        }
        const apiReq = axios.delete(
            apiURL + `/subscribers/${listID}.json?email=${subEmail}`,
            axiosConfig
        )
        const apiRes = await apiReq;
        console.log(apiRes.data);
        res.json(apiRes.data.message);
    } catch (error) {
        console.log(error);
        res.json(error.message);
    }
})
export default router;