import OrderModel from "./order.schema.js";

export const createNewOrderRepo = async (data, userId) => {
  const order = new OrderModel({ ...data, user: userId });
  return await order.save();
};

export const getSingleOrderRepo = async (id) => {
  return await OrderModel.findById(id);
};

export const myOrdersRepo = async (id) => {
  return await OrderModel.find({ user: id });
};

export const allPlacedOrdersRepo = async () => {
  return await OrderModel.find({ orderStatus: "Placed" });
};

export const updateOrderDetailsRepo = async (id, data) => {
  return await OrderModel.findByIdAndUpdate(
    id,
    {
      $set: {
        ...data,
      },
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
};
