import { Schema, model, models } from "mongoose";


const productSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: Array, required: true },
    categories: { type: Array, },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    countInstock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    color: { type: Array },
    size: { type: Array },
    discount: { type: Number, default: 0 }
}, {
    timestamps: true
})

const Product =
    models.Product || model("Product", productSchema)

export default Product