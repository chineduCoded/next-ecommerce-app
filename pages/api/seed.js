import nc from "next-connect"
import Product from "../../models/Product"
import { data } from "../../utils/data"
import db from "../../utils/db"

const handler = nc()

handler.get(async (req, res) => {
    try {
        await db.connect()
        await Product.deleteMany()
        await Product.insertMany(data.products)
        await db.disconnect()
        res.send({ message: "Seeded successfully" })
    } catch (error) {
        console.log("Seeding not successfull")
        console.log(error)
        process.exit(1)
    }
})

export default handler