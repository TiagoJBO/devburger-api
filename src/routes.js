import {Router} from "express";
import multer from "multer";
import authMiddleware from "./app/middlewares/auth";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";

import CategoryController from "./app/controllers/CategoryController";
import OrderController from "./app/controllers/OrderController";
import ProductController from "./app/controllers/ProductController";
import SessionController from "./app/controllers/SessionController";

const routes = new Router();

const uploads = multer(multerConfig);

routes.post("/user", UserController.store);

routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);

routes.post("/products", uploads.single("file"), ProductController.store);
routes.get("/products", ProductController.index);
routes.put("/products/:id", uploads.single("file"), ProductController.update);

routes.post("/categories", uploads.single("file"), CategoryController.store);
routes.get("/categories", CategoryController.index);
routes.put(
	"/categories/:id",
	uploads.single("file"),
	CategoryController.update,
);

routes.post("/orders", OrderController.store);
routes.get("/orders", OrderController.index);
routes.put("/orders/:id", OrderController.update);

export default routes;
