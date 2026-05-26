// FILE: frontend/src/services/productService.js

import api from "./api";

export const getAllProducts = async () => {        // gets all products
  const { data } = await api.get("/products");
  return data;
};

export const getProductById = async (id) => {     // gets single product using id
  const { data } = await api.get(`/products/${id}`);
  return data;
};
