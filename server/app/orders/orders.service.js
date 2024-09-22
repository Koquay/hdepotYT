const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { ObjectId } = mongoose.Types;
let res;

require("./orders.model");
require("../product/product.model");

const Orders = require("mongoose").model("Orders");

exports.placeOrder = async (req, response) => {
  const order = req.body;
  res = response;

  const bearer = req.headers.authorization.split(" ")[1];

  try {
    const { userId } = jwt.verify(bearer, process.env.JWT_SECRET);

    if(!userId) {
      return res.status(422).send(`You must be logged in to place an order`)
  }

    let newOrder = new Orders(order);
    console.log("newOrder = order", newOrder);

    newOrder.userId = userId;
    
    await newOrder.save();

    const returnOrder = await getOrder(newOrder._id);
    res.status(201).json(returnOrder);
  } catch (error) {
    console.log("error", error);
  }
};

const getOrder = async (orderId) => {
  try {
    const order = await Orders.findOne({
      _id: orderId,
    }).populate({
      path: "items.product",
      model: "Product",
    });

    console.log("newOrder", order);

    return order;
  } catch (error) {
    console.error(error);
    return res.status(500).send("Problem getting order..");
  }
};