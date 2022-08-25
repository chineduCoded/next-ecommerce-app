import nc from "next-connect"
import Product from "../../../models/Product"
import db from "../../../utils/db"

const handler = nc()

handler.get(async (req, res) => {
    try {
        await db.connect()
        const product = await Product.findById(req.body.id)
        await db.disconnect()
        res.send(product)
    } catch (error) {
        console.log("Could not get products!")
        console.log(error)
        process.exit(1)
    }
})


export default handler