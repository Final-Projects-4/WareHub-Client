import { baseUrl } from "./fetchData";


const fetchData = async (url, orderId) => {
    const response = await fetch(`${baseUrl}${url}/${orderId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    const data = await response.json();
    return data;
};
  
export const fetchOrderById = async (orderId) => {
const data = await fetchData("orders", orderId);
return data
};
  