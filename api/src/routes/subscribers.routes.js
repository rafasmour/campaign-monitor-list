// routes for managing subscribers
import { Router } from 'express';
import axios from "axios";
import { apiURL, axiosConfig } from "../connections/campmonitor.connection.js";
import env from "../vars/env.js";

const router = new Router();
const listID = env.CAMPMONITOR_LIST_ID;
router.route('/').get(async (req, res)=> {
    const apiReq = axios.get(
        apiURL + `/subscribers/${listID}.json`,
        axiosConfig
    );
    const apiRes = await apiReq;
    console.log(apiRes.data);
    res.json(apiRes.data);
})

router.route('/import').post(async (req, res)=> {
    const apiReq = axios.post(
        apiURL + `/subscribers/${listID}.json`,
        req.body,
        axiosConfig
    )
    const apiRes = await apiReq;
    console.log(apiRes.data);
    res.json(apiRes.data);
})

router.route('/delete').post(async (req, res) => {
    const subEmail = req.body.email;
    const apiReq = axios.delete(
        apiURL + `/subscribers/${listID}/?email=${subEmail}`,
        {},
        axiosConfig
    )
    const apiRes = await apiReq;
    console.log(apiRes.data);
    res.json(apiRes.data);
})
export default router;