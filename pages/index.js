import React from "react"
import Layout from "../components/Layout"
import HomeScreen from "../components/HomeScreen"
import db from "../utils/db"
import Product from "../models/Product"

export default function Home({ products }) {

  return (
    <>
      <Layout>
        <HomeScreen products={products} />
      </Layout>
    </>
  )
}

export async function getServerSideProps() {
  await db.connect()
  const products = await Product.find({}).lean()
  await db.disconnect()

  return {
    props: {
      products: products.map(db.convertDocToObj)
    }
  }
}
