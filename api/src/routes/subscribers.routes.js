// routes for managing subscribers
import {Router} from 'express';
import axios from "axios";
import {apiURL, axiosConfig} from "../connections/campmonitor.connection.js";
import env from "../vars/env.js";
import validator from 'email-validator';

const router = new Router();
const listID = env.CAMPMONITOR_LIST_ID;
router.route('/').get(async (req, res)=> {
    try {
        const apiReq = axios.get(
            apiURL + `/lists/${listID}/active.json`,
            axiosConfig
        );
        console.log('hey')
        const apiRes = await apiReq;
        const data = apiRes.data;
        const subscribers = data.Results;
        res.json(subscribers);
    } catch (error) {
        res.json(error.message);
    }
})

router.route('/import').post(async (req, res)=> {
    try {
        const subscribers = req.body.subscribers;
        const newSubs = subscribers?.map( (sub) => {
            if(!sub.EmailAddress || !sub.Name){
                throw new Error("Subscriber must have an email address and name");
            }

            const isEmailValid = validator.validate(sub.EmailAddress);

            if(!isEmailValid){
                throw new Error("Emailaddress is not valid");
            }
            return {
                EmailAddress: sub.EmailAddress,
                Name: sub.Name,
                MobileNumber: "",
                Resubscribe: true,
                RestartSubscriptionBasedAutoresponders: true,
                ConsentToTrack: "Yes",
                ConsentToSendSms: "Yes"
            };
        })
        console.log(newSubs);

        const reqBody = {
            Subscribers: newSubs,
            Resubscribe: true,
            QueueSubscriptionBasedAutoResponders: false,
            RestartSubscriptionBasedAutoresponders: true
        }
        const apiReq = axios.post(
            apiURL + `/subscribers/${listID}/import.json`,
            reqBody,
            axiosConfig
        )
        const apiRes = await apiReq;
        res.json(apiRes.data);
    } catch (error) {
        res.json(error.message);
    }

})

export default router;