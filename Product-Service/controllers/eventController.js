import Product from "../models/productModel.js";

export const eventhandler = async (req, res) => {
  const event = req.body;
  const { type, data } = event;

  if (type === "QuntityUpdated") {
    const { userId, productId, quantity, action } = data;

    console.log("productId", productId);
    console.log("quantity", quantity);
    console.log("action", action);
    let product;

    try {
      if (action === "increment") {
        product = await Product.findOneAndUpdate(
          { _id: productId },
          { $inc: { quantity: -1 } },
          { new: true }
        );
      }
      if (action === "decrement") {
        product = await Product.findOneAndUpdate(
          { _id: productId },
          { $inc: { quantity: +1 } },
          { new: true }
        );
      }
      console.log("product", product.quantity);
      res.send({ status: "OK" });
    } catch (error) {
      console.error("Error updating product quantity:", error);
      res.status(500).send({ error: "Failed to update product quantity" });
    }
  } else {
    res.send({ status: "OK" });
  }
};
