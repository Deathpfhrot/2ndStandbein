const { findOrderByEmail } = require("../db-access/orders-dao");
const { makeOrder } = require("../domain/Order");
const { createPasswordHash, createToken } = require("../utils/hash");

function login({ email, password }) {
  //step 1 - gibt die den user mit deser email adress überhaupt
  //step 2 - password prüfen
  //step 3.error - error schicken, wenn das password nicht stimmt
  //step 3.success - token erzeugen und verschicken (wenn beides okay)

  const invalidLoginMsg = "Invalid login.";

  // step 1 - gibts die den user mit deiser email adress überhaupt
  return findOrderByEmail(email).then((foundOrder) => {
    if (!foundOrder) {
      throw new Error("1", invalidLoginMsg);
    }
    //step 2 - password prüfen
    const order = makeOrder(foundOrder);
    const passwordHash = createPasswordHash(password, order.passwordSalt);
    const correctPassword = order.passwordHash === passwordHash;
    console.log("passoword?", correctPassword);

    if (!correctPassword) {
      //step 3. error - error schicken, wenn das passowrd nicht stimmt
      throw new Error(invalidLoginMsg);
    }

    // Success --->
    // step 3. success - token erzeugen und verschicken (wenn beides okay)

    const token = createToken(order);
    return token;
  });
}

module.exports = {
  login,
};
