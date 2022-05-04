const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");

const { listAllPlanes } = require("./src/use-cases/list-all-products");
const { createNewPlane } = require("./src/use-cases/create-new-planes");
const { showPlane } = require("./src/use-cases/show-planes");
const {
  addProductToUserWishlist,
} = require("./src/use-cases/add-product-to-user-wishlist");
const { doAuthMiddleware } = require("./src/auth/auth-middleware");
const { login } = require("./src/use-cases/login-user");
const { registerOrder } = require("./src/use-cases/register-order");

const PORT = process.env.PORT || 1234;
const app = express();

app.use(cors());
app.use(express.json());

//Middleware
app.use((req, _, next) => {
  console.log("New Request", req.method, req.url);
  next();
});

app.get("/", (_, res) => {
  res.send("server works : ) ");
});

app.get("/api/planes/all", function getAllPlanesController(_, res) {
  const handleError = (error) =>
    res
      .status(500)
      .json({ err: error.message || "Unknown error while reading planes." });

  try {
    listAllPlanes()
      .then((Airplanes) => res.json(Airplanes))
      .catch(handleError);
  } catch (err) {
    handleError(err);
  }
});

app.get("/api/planes/single/:id", (req, res) => {
  const handleError = (error) =>
    res.status(500).json({ err: error.message || "Unknown error while" });

  try {
    const id = req.params.id;

    showPlane({ planeId: id })
      .then((planes) => res.json(planes))
      .catch((err) => handleError(err));
  } catch (err) {
    handleError(err);
  }
});

app.post("/api/planes/add", (req, res) => {
  const handleError = (error) =>
    res.status(500).json({
      err: error.message || "Unknown error while creating new Product.",
    });

  try {
    const planesInfo = req.body;

    createNewPlane(planesInfo)
      .then((planes) => res.json(planes))
      .catch(handleError);
  } catch (err) {
    handleError(err);
  }
});

app.post("/api/orders/register", (req, res) => {
  const handleError = (error) =>
    res.status(500).json({
      err: error.message || "Unknown error while register new Order.",
    });

  try {
    const orderInfo = req.body;

    registerOrder(orderInfo)
      .then((order) => res.json(order))
      .catch(handleError);
  } catch (error) {
    handleError(error);
  }
});

app.post("/api/orders/login", (req, res) => {
  const handleError = (error) => {
    console.log(error);
    res.status(404).json({ err: "Not found." }); // Predtend to know nothing
  };

  try {
    const email = req.body.email;
    const password = req.body.password;

    login({ email, password })
      .then((token) => res.json({ token }))
      .catch(handleError);
  } catch (error) {
    handleError(error);
  }
});

// app.post("/api/orders/addOrder", (req, res) => {
//     const handleError = error => res.status(500).json({ err: error.message || "Unknown error while adding product to Orderlist." })

//     try{
//         const orderId = req.body.orderId
//         const planesId = req.body.planesId

//         addPlanesToOrderList({ orderId, planesId })
//         .then(_ => res.status(201).end())
//         .catch(handleError)
//     } catch(err){
//         handleError(err)
//     }
// })

app.post("/api/orders/addToWishlist", doAuthMiddleware, (req, res) => {
  const handleError = (error) =>
    res.status(500).json({
      err:
        error.message ||
        "Unknown error while adding product to order Wishlist.",
    });

  try {
    const orderId = req.OrderClaims.sub; // req.body.orderId
    const planesId = req.body.planeId;

    addProductToUserWishlist({ orderId, planesId })
      .then((wishliste) => res.status(201).json({ wishliste }))
      .catch(handleError);
  } catch (error) {
    handleError(error);
  }
});

app.listen(PORT, () => console.log("Server listing to Port: ", PORT));
