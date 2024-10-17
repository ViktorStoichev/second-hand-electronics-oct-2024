import { Router } from "express";
import authService from "../service/auth-service.js";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register', { title: 'Second Hand Electronics - Register' });
});

authController.post('/register', async (req, res) => {
    const { email, username, password, rePassword } = req.body;

    try {
        await authService.register(email, username, password, rePassword);

        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.end();
    }
});

export default authController;