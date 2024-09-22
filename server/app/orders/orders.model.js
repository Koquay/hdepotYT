const mongoose = require("mongoose");

const { ObjectId, Number } = mongoose.Schema.Types;

const OrdersSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,    
  },

  items: [
    {
      product: {
        type: ObjectId,
        ref: "Product",
        required: true,
      },
    
      quantity: Number,
      color: String,
      size: String
    },
  ],
    deliveryAddress: {
      firstName: String,
      lastName: String,
      phone: String,
      address1: String,
      address2: String,
      useAsBillingAddress: Boolean,
  },
  applianceDelivery: {
      deliveryDate: String,
      specialInstructions: String,
  },
  paymentMethod: {
      paymentType: String,
      cardNumber: String,
      expMonth: String,
      expYear: String,
      CVV: String,
      defaultCreditCard: Boolean,
  }

});

mongoose.model("Orders", OrdersSchema, "orders");
