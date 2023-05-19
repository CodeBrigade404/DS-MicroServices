import Product from "../models/productModel.js";

export const eventhandler = async (req, res) => {
  const event = req.body;
  const { type, data } = event;
  if (type === "ProductBought") {
    console.log("Event Received:", type, data);

    const { id, quantity } = data;
    console.log("id", id);
    console.log("quantity", quantity);

    try {
      // Find the product by its ID and update the quantity
      const product = await Product.findOneAndUpdate(
        { _id: id },
        { $inc: { quantity: -quantity } }, // Decrease the quantity by the bought quantity
        { new: true } // Return the updated document
      );

      console.log("Updated product:", product);
      res.send({ status: "OK" });
    } catch (error) {
      console.error("Error updating product quantity:", error);
      res.status(500).send({ error: "Failed to update product quantity" });
    }
  }
};
