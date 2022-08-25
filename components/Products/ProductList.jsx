import { Button, Card, Col, Grid, Row, Spacer, Text } from "@nextui-org/react";
import { FaStar } from "react-icons/fa"
import NextLink from "next/link"

export default function ProductList({ product }) {

    return (
        <Grid xs={6} sm={3}>
            <NextLink href={`/product/${encodeURIComponent(product.slug)}`} passHref>
                <Card isHoverable isPressable>
                    <Card.Body css={{ p: 0 }}>
                        <Card.Image
                            src={product.image[0]}
                            objectFit="cover"
                            width="100%"
                            height={300}
                            alt={product.name}
                            showSkeleton
                            maxDelay={10000}
                        />
                    </Card.Body>
                    {/* <Spacer y={0.5} /> */}
                    <Card.Footer>
                        <Row>
                            <Col>
                                <Text b>{product.name}</Text>
                                <Spacer y={0.5} />
                                <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                                    NGN{product.price}
                                </Text>
                            </Col>
                            <Col>
                                <Row justify="flex-end">
                                    <Text
                                        css={{ color: "Crimson" }}
                                        size={15}
                                        weight="bold"
                                        transform="uppercase"
                                    >
                                        <FaStar />
                                        <Text b css={{ ml: 5 }}>{product.rating}</Text>
                                    </Text>
                                </Row>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card>
            </NextLink>
        </Grid>
    );
}
