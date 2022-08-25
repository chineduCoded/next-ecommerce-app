import nc from "next-connect"
import Product from "../../../models/Product"
import db from "../../../utils/db"

const handler = nc()

handler.get(async (req, res) => {
    try {
        await db.connect()
        const products = await Product.find({})
        await db.disconnect()
        res.send(products)
    } catch (error) {
        console.log("Could not get prosucts!")
        console.log(error)
        process.exit(1)
    }
})


export default handler