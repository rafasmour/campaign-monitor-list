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
        const request = axios.get(
            apiURL + `/lists/${listID}/active.json`,
            axiosConfig
        );
        console.log('hey')
        const response = await request;
        const data = response.data;
        const subscribers = data.Results
        console.log(subscribers)
        res.json(subscribers);
    } catch (error) {
        res.json({ error_message: error.message });
    }
})

router.route('/import').post(async (req, res)=> {
    try {
        const subscribers = req.body.subscribers;
        if(subscribers === []){
            new Error("No subscribers provided");
        }
        const newSubs = subscribers.map( (sub) => {
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
        const newSubsNoDuplicate = [...new Set(newSubs)]

        console.log(newSubsNoDuplicate);

        const reqBody = {
            Subscribers: (newSubsNoDuplicate) ? newSubsNoDuplicate : [],
            Resubscribe: true,
            QueueSubscriptionBasedAutoResponders: false,
            RestartSubscriptionBasedAutoresponders: true
            // something: true
        }
        const request = axios.post(
            apiURL + `/subscribers/${listID}/import.json`,
            reqBody,
            axiosConfig
        )
        const response = await request;
        const data = response.data;
        res.json(data);
    } catch (error) {
        res.json({error_message: error.message});
    }

})

export default router;