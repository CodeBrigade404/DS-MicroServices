import mongoose from "mongoose"

const cartSchemaa = new mongoose.Schema({
    userId: { type: String, required: true},
    items: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        total: {type : Number , required : true}
      }
    ]
  });

export default mongoose.model('Cart', cartSchemaa)
