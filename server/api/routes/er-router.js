import express from 'express';
import * as ERController from '../controllers/er-controller.js';

const router = express.Router();

// Code to fetch all the requests
router.route('/requests')
    .post(ERController.post)
    .get(ERController.findRequest);

// Code to fetch requests by id
router.route('/requests/:id')
    .get(ERController.get)
    .put(ERController.update);

export default router;