const { createRandomSalt, createPasswordHash } = require("../utils/hash");

function makeOrder({
  _id,
  date,
  products,
  state,
  price,
  customer,
  createdAt,
  wishliste,
  email,
  password,
  passwordHash,
  passwordSalt,
}) {
  if (typeof customer !== "string" || customer.trim().length === 0) {
    throw new Error("User name must be a non-emty string");
  }

  if (!passwordHash && !password) {
    throw new Error("User must provide a password or passwordHash");
  }

  const _pwSalt = passwordSalt || createRandomSalt();

  return {
    date,
    products,
    state,
    price,
    wishliste: wishliste || [],
    createdAt: createdAt || new Date(),
    customer,
    _id,
    passwordHash: passwordHash || createPasswordHash(password, _pwSalt),
    passwordSalt: _pwSalt,
    email,
  };
}

module.exports = {
  makeOrder,
};
