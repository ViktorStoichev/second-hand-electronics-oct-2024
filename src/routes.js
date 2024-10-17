import { Router } from "express";
import homeController from "./controller/home-controller.js";
import authController from "./controller/auth-controller.js";

const routes = Router();

routes.use(homeController);
routes.use('/auth', authController);

export default routes