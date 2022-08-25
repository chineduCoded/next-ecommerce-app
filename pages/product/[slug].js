import React from 'react'
import { useRouter } from "next/router"
import { data } from '../../utils/data'
import NextLink from "next/link"
import { Button, Card, Col, Grid, Link, Image, Row, Spacer, Text } from '@nextui-org/react'
import { BsArrowLeft } from "react-icons/bs"
import Layout from "../../components/Layout"
import db from '../../utils/db'
import Product from '../../models/Product'
import { useStore } from '../../utils/Store'



export default function ProductScreen({ product }) {
    const router = useRouter()
    const { dispatch } = useStore()


    if (!product) {
        return <Layout><h1>Products not found</h1></Layout>
    }

    const addToCartHandler = () => {
        dispatch({ type: "ADD_CART_ITEM", payload: { ...product, qty: 1 } })
        router.push("/cart")
    }

    return (
        <Layout title={product.name} description={product.description}>
            <Col justify='center' css={{
                px: 10
            }}>
                <NextLink href="/" passHref>
                    <Link block color="error">
                        <Row justify='flex-start' align='center'>
                            <Text color='error'>
                                <BsArrowLeft />
                            </Text>
                            <Spacer x={0.2} />
                            <Text b color='error'>
                                Continue shopping
                            </Text>
                        </Row>
                    </Link>
                </NextLink>
                <Spacer y={1} />
                <Row justify='center'>
                    <Card css={{ mw: "960px" }}>
                        <Card.Body>
                            <Grid.Container gap={2} justify='center'>
                                <Grid xs={12} md={6}>
                                    <Image
                                        src={product.image[0]}
                                        alt={product.name}
                                        width="100%"
                                        height={350}
                                        objectFit="cover"
                                        showSkeleton
                                        maxDelay={10000}
                                        css={{ br: 10 }}
                                    />
                                </Grid>
                                <Grid xs={12} md={6}>
                                    <Col>
                                        <Text h2 css={{ fontWeight: "$semibold" }}>{product.name}</Text>

                                        <Row>
                                            <Text size={18} css={{ fontWeight: "$semibold" }}>Brand:</Text>
                                            <Spacer x={0.5} />
                                            <Text size={18} css={{ fontWeight: "$semibold" }}>{product.brand}</Text>
                                        </Row>

                                        <Row>
                                            <Text size={18} css={{ fontWeight: "$semibold" }}>Category:</Text>
                                            <Spacer x={0.5} />
                                            <Text size={18} css={{ textTransform: "capitalize", fontWeight: "$semibold" }}>{product.category}</Text>
                                        </Row>

                                        <Text size={18} css={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: "$semibold" }}>Desccription:&nbsp; {product.description}</Text>


                                        <Text size={18} css={{ fontWeight: "$semibold" }}> Rating:&nbsp; {product.rating} stars ({`${product.numReviews} reviews`})</Text>
                                        <Row>
                                            <Text size={18} css={{ fontWeight: "$semibold" }}>Status:</Text>
                                            <Spacer x={0.5} />
                                            <Text size={18} css={{ fontWeight: "$semibold" }}>{product.countInstock > 0 ? "In Stock" : "Out of stock"}</Text>
                                        </Row>

                                        <Row justify="flex-start" align='center'>
                                            <Text size={18} css={{ fontWeight: "$bold" }}>NGN{product.price - (product.price * 0.2)}</Text>
                                            <Spacer x={0.5} />
                                            <Text del color='gray' size={16} css={{ fontWeight: "$bold" }}>NGN{product.price}</Text>
                                            <Spacer x={0.5} />

                                            <Text color='success' size={18} css={{ fontWeight: "$bold" }}>20% off</Text>
                                        </Row>
                                        <Spacer y={1} />
                                        <Row align='center'>
                                            <NextLink href="#" passHref>
                                                <Link>
                                                    <Button
                                                        auto
                                                        color="error"
                                                        type='button'
                                                        aria-label='Buy Now'
                                                        disabled={product.countInstock <= 0}>
                                                        {product.countInstock <= 0 ? "Out of Stock" : "Buy Now"}
                                                    </Button>
                                                </Link>
                                            </NextLink>
                                            <Spacer x={0.5} />
                                            {/* {
                                                cartItems.some((p) => p._id === product._id) ? (
                                                    <Button
                                                        color="error"
                                                        type="button"
                                                        onPress={() => dispatch({ type: "REMOVE_FROM_CART", payload: product })}
                                                    aria-label='Remove from cart'>Remove From Cart</Button>
                                                ) : (<Button
                                                    auto
                                                    bordered
                                                    color="error"
                                                    type='button'
                                                    onPress={() => dispatch({ type: "ADD_CART_ITEM", payload: product })}
                                                    disabled={product.countInstock <= 0}
                                                    aria-label='Add to cart'>
                                                    {product.countInstock <= 0 ? "Out of Stock" : "Add To Cart"}
                                                </Button>)
                                            } */}
                                            <Button
                                                auto
                                                bordered
                                                color="error"
                                                type='button'
                                                onPress={addToCartHandler}
                                                disabled={product.countInstock <= 0}
                                                aria-label='Add to cart'>
                                                {product.countInstock <= 0 ? "Out of Stock" : "Add To Cart"}
                                            </Button>
                                        </Row>
                                    </Col>
                                </Grid>
                            </Grid.Container>

                        </Card.Body>
                    </Card>
                </Row>
            </Col>
        </Layout>
    )
}

export async function getServerSideProps(ctx) {
    const { params } = ctx
    const { slug } = params
    await db.connect()
    const product = await Product.findOne({ slug }).lean()
    await db.disconnect()

    return {
        props: {
            product: db.convertDocToObj(product)
        }
    }
}

