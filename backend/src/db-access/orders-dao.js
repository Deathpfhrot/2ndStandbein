const { ObjectId } = require("mongodb");
const { getDB } = require("./getDB");

async function findByID(id) {
  const db = await getDB();
  const foundOrder = await db
    .collection("Orders")
    .findOne({ _id: new ObjectId(id) });
  return foundOrder;
}

async function insertOne(order) {
  const db = await getDB();
  console.log(db);
  const insertResult = await db.collection("Orders").insertOne(order);
  console.log(insertResult);
  return insertResult;
}

function findOrderByEmail(email) {
  return getDB().then((db) =>
    db.collection("Orders").findOne({ email: email })
  );
}

function updateProduct(orderId) {
  return getDB().then((db) =>
    db
      .collection("Orders")
      .updateOne({ _id: new ObjectId(orderId) }, { $set: { state: true } })
  );
}
module.exports = {
  insertOne,
  findByID,
  updateProduct,
  findOrderByEmail,
};
