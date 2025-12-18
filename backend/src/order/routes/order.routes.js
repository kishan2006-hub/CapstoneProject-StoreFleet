import express from "express";
import { createNewOrder,getSingleOrder,myOrders ,allPlacedOrders, updateOrderDetails} from "../controllers/order.controller.js";
import { auth } from "../../../middlewares/auth.js";

const router = express.Router();

router.route("/new").post(auth, createNewOrder);
router.route("/id").get(auth, getSingleOrder);
router.route("/my/orders").get(auth, myOrders);
router.route("/orders/placed").get(auth, allPlacedOrders);
router.route("/update/:id").put(auth, updateOrderDetails);

export default router;
