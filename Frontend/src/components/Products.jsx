import { useEffect, useState } from "react";
import styled from "styled-components";
// import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(cat
                    ? `http://localhost:5000/api/products?category=${cat}`
                    : "http://localhost:5000/api/products"
                );
                setProducts(res.data)
                console.log(setProducts);
            } catch (error) { console.log(error); }
        };
        getProducts()
    }, [cat]);

    useEffect(() => {
        cat && setFilteredProducts(
            products.filter(item =>
                Object.entries(filters).every(([key, value]) =>
                    item[key].includes(value)
                )
            )
        );
    }, [products, cat, filters])

    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts(prev =>
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            );
        } else if (sort === "newest") {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => a.createdAt - b.createdAt)
            );
        } else {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => b.createdAt - a.createdAt)
            );
        }
    }, [sort])
    return (
        <Container>
            {cat
                ? filteredProducts.map((item) => (<Product item={item} key={item.id} />))
                : products
                    .slice(0, 8)
                    .map((item) => (<Product item={item} key={item.id} />
                    ))}
        </Container>
    );
};

export default Products;
