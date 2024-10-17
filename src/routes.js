import { Router } from "express";
import homeController from "./controller/home-controller.js";
import authController from "./controller/auth-controller.js";
import electronicsController from "./controller/electronics-controller.js";

const routes = Router();

routes.use(homeController);
routes.use('/auth', authController);
routes.use('/electronics', electronicsController);

routes.all('*', (req, res) => {
    res.render('home/404', { title: 'Second Hand Electronics - 404 Page not found' });
});

export default routes