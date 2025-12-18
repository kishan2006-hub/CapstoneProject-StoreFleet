import { createNewOrderRepo,getSingleOrderRepo ,myOrdersRepo , allPlacedOrdersRepo, updateOrderDetailsRepo} from "../model/order.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";

export const createNewOrder = async (req, res, next) => {
  try {
    const order = await createNewOrderRepo(req.body,req.user._id);
    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(400, error.message));
  }
};

export const getSingleOrder = async (req, res, next) => {
  try {
    const order = await getSingleOrderRepo(req.params.id);
    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(400, error.message));
  }
};

export const myOrders = async (req, res, next) => {
  try {
    const orders = await myOrdersRepo(req.user._id);
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(400, error.message));
  }
};

export const allPlacedOrders = async (req, res, next) => {
  try {
    const orders = await allPlacedOrdersRepo();
    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(400, error.message));
  }
};

export const updateOrderDetails = async (req, res, next) => {
  try {
    const order = await updateOrderDetailsRepo(req.params.id,req.body);
    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(400, error.message));
  }
};
