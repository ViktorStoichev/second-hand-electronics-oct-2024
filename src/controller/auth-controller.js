import { Router } from "express";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('auth/register', { title: 'Second Hand Electronics - Register' });
});

export default authController;