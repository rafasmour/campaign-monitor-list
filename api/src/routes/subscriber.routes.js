import { Router } from 'express';
import axios from "axios";

const router = new Router();

router.route('/').get((req, res) => {
    axios.get('')
})