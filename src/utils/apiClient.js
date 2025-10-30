import axios from "axios";

export const getUserById = async (userId) => {
  const url = `${process.env.USER_SERVICE_URL}/${userId}`;
  const { data } = await axios.get(url);
  return data;
};

export const getProductById = async (productId) => {
  const url = `${process.env.PRODUCT_SERVICE_URL}/${productId}`;
  const { data } = await axios.get(url);
  return data;
};
