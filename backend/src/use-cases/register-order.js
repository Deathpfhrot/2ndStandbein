const { findOrderByEmail, insertOne } = require("../db-access/orders-dao");
const { makeOrder } = require("../domain/Order");

function registerOrder(orderInfo) {
  return new Promise((resolve, reject) => {
    console.log("new Promisregister", orderInfo);

    return findOrderByEmail(orderInfo.email)
      .then((foundOrder) => {
        console.log("then foundOrder", foundOrder);
        if (foundOrder) {
          reject({
            message: "Order with email " + orderInfo.email + " already exists.",
          });
          return;
        }

        const order = makeOrder(orderInfo);
        return insertOne(order);
      })
      .then((updateResult) => resolve(updateResult));
  });
}

module.exports = {
  registerOrder,
};
