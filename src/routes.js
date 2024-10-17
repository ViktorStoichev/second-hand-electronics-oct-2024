import { Router } from "express";
import homeController from "./controller/home-controller.js";

const routes = Router();

routes.use(homeController);

export default routes