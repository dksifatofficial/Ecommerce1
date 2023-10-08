import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
    },
    productQuantity: {
        type: Number,
        required: true,
        ref: 'Quantity'
    },
    productCode: {
      type: String,
      ref: 'Item Code'
    },
    requiredSize: {
      type: Array,
      ref: 'Required Size'
    },
    requiredColor: {
      type: Array,
      ref: 'Required Color'
    }
  },
  { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
export default Cart;