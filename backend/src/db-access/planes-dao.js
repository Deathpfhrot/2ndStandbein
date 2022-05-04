const { ObjectId } = require("mongodb");
const { getDB } = require("./getDB");

async function findAllPlanes() {
  const db = await getDB();
  // console.log(db);
  const planes = await db.collection("Airplanes").find().toArray();
  // console.log(planes);
  return planes;
}

async function findByID(id) {
  const db = await getDB();
  console.log(db);
  const planes = db.collection("Airplanes").findOne({ _id: new ObjectId(id) });
  console.log(planes);
  return planes;
}

async function insertOne(plane) {
  const db = await getDB();
  const planes = db.collection("Airplanes").insertOne(plane);
  return planes;
}

module.exports = {
  insertOne,
  findByID,
  findAllPlanes,
};
