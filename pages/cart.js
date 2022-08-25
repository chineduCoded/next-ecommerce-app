import React from 'react'
import dynamic from "next/dynamic"
import { Button, Card, Checkbox, Col, Container, Grid, Image, Input, Link, Row, Spacer, Table, Text, Tooltip } from '@nextui-org/react'
import Layout from '../components/Layout'
import { useStore } from '../utils/Store'
import NextLink from 'next/link'
import { BsArrowLeft } from "react-icons/bs"
import { DeleteIcon } from '../icons/DeleteIcon'
import { IconButton } from '../components/IconButton'
import { RiShoppingCart2Fill } from "react-icons/ri"
import { SiAdguard } from "react-icons/si"
import { FaStoreAlt } from "react-icons/fa"
import { TbHeartPlus } from "react-icons/tb"


function CartScreen() {
    const { state: { cartItems }, dispatch } = useStore()


    return (
        <Layout title="Shopping Cart">
            <Container md justify="center" align="center" css={{ px: 10 }}>

                {
                    cartItems.length === 0 ? (
                        <Card css={{ py: 20 }}>
                            <Card.Body css={{ justifyContent: "center", alignItems: "center" }}>
                                <Card variant='flat' css={{ w: 100, h: 100, br: "50%" }}>
                                    <Card.Body css={{ justifyContent: "center", alignItems: "center" }}>
                                        <RiShoppingCart2Fill size={50} color="#f31260" />
                                    </Card.Body>
                                </Card>
                                <Spacer y={0.8} />
                                <Text h4 b>Your cart is empty!</Text>
                                <Spacer y={0.8} />
                                <Text>Browse our categories and discover our best deals!</Text>
                                <Spacer y={2} />
                                <NextLink href="/" passHref>
                                    <Button type='button' color={'error'} size="lg" css={{ tt: "uppercase" }}>Go Shopping</Button>
                                </NextLink>
                            </Card.Body>
                        </Card>
                    ) : (
                        <>
                            <Grid.Container gap={1}>
                                <Grid md={8} xs={12}>

                                    <Col>
                                        <Card css={{ px: 5 }}>
                                            <Card.Body>
                                                <Text h2>Shopping Cart ({cartItems.reduce((a, c) => a + c.qty, 0)})</Text>
                                                <Spacer y={1} />
                                                <Row justify='space-between' align='center' wrap='wrap'>
                                                    <Checkbox
                                                        color='error'
                                                    >Select all items</Checkbox>
                                                    <Button type='button' auto color={'error'}>Delete</Button>

                                                </Row>
                                            </Card.Body>
                                        </Card>
                                        <Spacer y={0.8} />
                                        {cartItems.map((item) => (
                                            <>
                                                <Card key={item._id}>
                                                    <Card.Body>
                                                        <Checkbox
                                                            color='error'
                                                        >
                                                            <FaStoreAlt /> &nbsp;
                                                            Debby Elina Store
                                                        </Checkbox>
                                                        <Spacer y={0.8} />
                                                        <Card.Divider></Card.Divider>
                                                        <Spacer y={0.8} />
                                                        <Checkbox color='error'>
                                                            <Row justify='space-between'>
                                                                <Col>
                                                                    <NextLink href={`/product/${item.slug}`} passHref>
                                                                        <Link>
                                                                            <Image
                                                                                src={item.image[0]}
                                                                                alt={item.name}
                                                                                width={100}
                                                                                height={100}
                                                                                objectFit="cover"
                                                                                showSkeleton
                                                                                maxDelay={10000}
                                                                                css={{ br: 10 }}
                                                                            />
                                                                        </Link>
                                                                    </NextLink>
                                                                </Col>
                                                                <Spacer x={0.5} />
                                                                <Col>
                                                                    <Row align='center' justify='space-between'>
                                                                        <Col>
                                                                            <Row><NextLink href={`/product/${item.slug}`} passHref>
                                                                                <Link>
                                                                                    <Text b size={14}>{item.name}</Text>
                                                                                </Link>
                                                                            </NextLink></Row>
                                                                        </Col>
                                                                        <Col>
                                                                            <Row align='center'>
                                                                                <Tooltip
                                                                                    content="Add to wishlist"
                                                                                    color={'error'}
                                                                                    onPress={() => console.log("Add to favourite", item._id)}>
                                                                                    <IconButton aria-label='Add to favourite'>
                                                                                        <TbHeartPlus size={20} color='#FF0080' />
                                                                                    </IconButton>
                                                                                </Tooltip>
                                                                                <Tooltip
                                                                                    content="Delete item"
                                                                                    color="error"
                                                                                    onPress={() => console.log("Delete item", item._id)}
                                                                                >
                                                                                    <IconButton aria-label='Delete item'>
                                                                                        <DeleteIcon size={20} fill="#FF0080" />
                                                                                    </IconButton>
                                                                                </Tooltip>
                                                                            </Row>
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            </Row>
                                                        </Checkbox>
                                                    </Card.Body>
                                                </Card>
                                                <Spacer y={0.8} />
                                            </>
                                        ))}
                                    </Col>
                                </Grid>
                                <Grid md={4} xs={12}>
                                    <Col>
                                        <Card>
                                            <Card.Body>
                                                <Text h2 b>Order Summary</Text>
                                                <Spacer y={0.5} />
                                                <Col>
                                                    <Row align="center" justify="space-between">
                                                        <Text size={17} b>Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)}{" "} {cartItems.length === 1 ? "item" : "items"})
                                                        </Text>
                                                        <Text size={17} b>
                                                            NGN{cartItems.reduce((a, c) => a + c.qty * c.price, 0)}
                                                        </Text>
                                                    </Row>
                                                    <Spacer y={0.5} />
                                                    <Row align="center" justify="space-between">
                                                        <Text size={17} b>Shipping Fee</Text>
                                                        <Text size={17} b>NGN0</Text>
                                                    </Row>
                                                    <Spacer y={0.5} />
                                                    <Row align="center" justify="space-between">
                                                        <Text h4 b>Total</Text>
                                                        <Text h4 css={{ fontWeight: "$bold" }}>NGN{cartItems.reduce((a, c) => a + c.qty * c.price, 0)}</Text>
                                                    </Row>
                                                </Col>
                                                <Spacer y={2} />
                                                <NextLink href="/" passHref>
                                                    <Link>
                                                        <Button aria-label='Checkout' size={'lg'} color={'error'} css={{ width: "stretch" }}>
                                                            Checkout (NGN{cartItems.reduce((a, c) => a + c.qty * c.price, 0)})
                                                        </Button>
                                                    </Link>
                                                </NextLink>
                                            </Card.Body>
                                        </Card>
                                        <Spacer y={0.8} />
                                        <Card>
                                            <Card.Body>
                                                <Text h2>Payment methods</Text>
                                                <Spacer y={0.5} />
                                                <Text>Payment methods goes here</Text>
                                                <Card.Divider></Card.Divider>
                                                <Text h2>Buyer Protection</Text>
                                                <Spacer y={0.5} />
                                                <Text b css={{ alignItems: "center" }}>
                                                    <SiAdguard color='teal' size={15} />
                                                    <Text b size={17} css={{ ml: 5 }}>Get full refund if the item is not as described or if is not delivered</Text>
                                                </Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Grid>
                            </Grid.Container>
                        </>
                    )
                }
            </Container>
        </Layout>
    )
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false })
