import { Router } from "express";
import electronicsService from "../service/electronics-service.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const electronicsController = Router();

electronicsController.get('/create', (req, res) => {
    res.render('electronics/create', { title: 'Second Hand Electronics - Create' });
});

electronicsController.post('/create', async (req, res) => {
    const data = req.body;
    const userId = req.user._id;

    try {
        await electronicsService.create(data, userId);

        res.redirect('/electronics');
    } catch (err) {
        const error = getErrorMessage(err);

        return res.render('electronics/create', { title: 'Second Hand Electronics - Create', error, data });
    }
});

electronicsController.get('/', (req, res) => {
    res.render('electronics/catalog', { title: 'Second Hand Electronics - Catalog' });
});

export default electronicsController;