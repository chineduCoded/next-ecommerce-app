import React from 'react'
import { Container, Spacer, Text, Row, Grid } from '@nextui-org/react'
import ProductList from './Products/ProductList'
import { data } from '../utils/data'


const HomeScreen = ({ products }) => {

    return (
        <Container css={{ p: 5 }}>
            <Text h3 size={25} css={{ fontWeight: "$semibold" }}>New Arrival</Text>
            <Spacer y={0.5} />

            <Row align='center' justify='center' css={{ mb: 30 }}>
                <Grid.Container gap={1} justify="flex-start">
                    {products.map((product) => (
                        <ProductList key={product.name} product={product} />
                    ))}
                </Grid.Container>
            </Row>

            <Text h3 size={25} css={{ fontWeight: "$semibold" }}>Featured Products</Text>
            <Spacer y={0.5} />
            <Text h3 size={25} css={{ fontWeight: "$semibold" }}>More To Love</Text>
            <Spacer y={0.5} />
        </Container>
    )
}

export default HomeScreen