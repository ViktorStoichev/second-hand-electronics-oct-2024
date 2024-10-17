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

electronicsController.get('/', async (req, res) => {
    const electronics = await electronicsService.getAll().lean();

    res.render('electronics/catalog', { title: 'Second Hand Electronics - Catalog', electronics });
});

electronicsController.get('/:deviceId/details', async (req, res) => {
    const deviceId = req.params.deviceId;
    const device = await electronicsService.getOne(deviceId).lean();
    const isOwner = await isDeviceOwner(deviceId, req.user?._id);
    const isBought = device.buyingList?.some(userId => userId == req.user?._id);

    res.render('electronics/details', { title: 'Second Hand Electronics - Details', device, isOwner, isBought });
});

electronicsController.get('/:deviceId/buy', async (req, res) => {
    const deviceId = req.params.deviceId;
    const userId = req.user?._id;

    try {
        await electronicsService.buy(deviceId, userId);

        res.redirect(`/electronics/${deviceId}/details`);
    } catch (err) {
        console.log(err);
    }
});

async function isDeviceOwner(deviceId, userId) {
    const device = await electronicsService.getOne(deviceId);
    const isOwner = device.owner.toString() === userId;

    return isOwner;
}

export default electronicsController;