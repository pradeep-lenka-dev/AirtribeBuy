import { useState, useEffect } from "react";
import AIRTRIBE_API from "../api/baseapi";

export function useGetAllProducts(limit = 40, sort = "asc") {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getAllProducts() {
            setLoading(true);
            const products = await AIRTRIBE_API.get(`/products?limit=${limit}&sort=${sort}`); //?limit=${limit}&sort=${sort}
            setLoading(false);
            setProducts(prev => [...prev, ...products.data]);
        }
        try {
            getAllProducts();
        } catch (error) {
            console.log("🚀 ~ useEffect ~ error:", error)
            setLoading(false);
        }
    }, [limit, sort])
    return [products, loading]
}
export function useGetProductDetails(productId) {
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({});
    async function getSingleProductDetails(productId) {
        setLoading(true);
        const product = await AIRTRIBE_API.get(`/products/${productId}`);
        setLoading(false);
        setProduct(product.data);
    }
    useEffect(() => {
        try {
            getSingleProductDetails(productId);
        } catch (error) {
            setLoading(false);
        }
    }, [productId])
    return [product, loading]
}
export function useGetAllCategories() {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    async function getAllCategories() {
        setLoading(true);
        const categories = await AIRTRIBE_API.get("/products/categories");
        setCategories(categories.data);
    }
    useEffect(() => {
        try {
            getAllCategories();
        } catch (error) {
            setLoading(false);
        }
    }, [])
    return [categories, loading]
}
export function useGetAllProductsInCategory(category) {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    async function getProductsByCategory(category) {
        setLoading(true);
        const products = await AIRTRIBE_API.get(`/products/category/${category}`);
        setProducts(products.data);
        setLoading(false);
    }
    useEffect(() => {
        try {
            getProductsByCategory(category);
        } catch (error) {
            setLoading(false);
        }
    }, [category])
    return [products, loading]
}