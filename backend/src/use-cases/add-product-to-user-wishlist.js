const PlanesDAO = require("../db-access/planes-dao");
const OrdersDAO = require("../db-access/orders-dao");
const { makePlane } = require("../domain/Airplane");
const { makeOrder } = require("../domain/Order");

async function addProductToUserWishlist({ orderId, planesId }) {
  const [foundOrder, foundPlane] = await Promis.all([
    OrdersDAO.findByID(orderId),
    PlanesDAO.findByID(planesId),
  ]);

  if (!foundOrder) {
    reject({ message: "Order with id " + orderId + "was not found" });
    return;
  }

  if (!foundPlane) {
    reject({ message: "Plane with id " + planesId + " doesent exist!" });
    return;
  }

  const order = makeOrder(foundOrder);
  const plane = makePlane(foundPlane);

  await OrdersDAO.updateOrderWishlist(order._id, plane._id);

  const updatedOrder = await OrdersDAO.findByID(orderId);
  return updatedOrder.wishliste;
}

module.exports = {
  addProductToUserWishlist,
};
