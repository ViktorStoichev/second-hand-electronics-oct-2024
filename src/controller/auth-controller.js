import { Router } from "express";
import authService from "../service/auth-service.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register', { title: 'Second Hand Electronics - Register' });
});

authController.post('/register', async (req, res) => {
    const { email, username, password, rePassword } = req.body;

    try {
        const token = await authService.register(email, username, password, rePassword);

        res.cookie(process.env.AUTH_COOKIE_NAME, token, { httpOnly: true });

        res.redirect('/');
    } catch (err) {
        const error = getErrorMessage(err);
        console.log(err);

        res.render('auth/register', { title: 'Second Hand Electronics - Register', email, username, error });
    }
});

authController.get('/login', (req, res) => {
    res.render('auth/login', { title: 'Second Hand Electronics - Login' });
});

authController.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie(process.env.AUTH_COOKIE_NAME, token, { httpOnly: true });

        res.redirect('/');
    } catch (err) {
        const error = getErrorMessage(err);

        res.render('auth/login', { title: 'Second Hand Electronics - Login', email, error });
    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie(process.env.AUTH_COOKIE_NAME);

    res.redirect('/auth/login');
});

export default authController;