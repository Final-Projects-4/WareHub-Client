import { baseUrl } from "./fetchData";

const updateData = async (url, id, body) => {
    const response = await fetch(`${baseUrl}${url}/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  };
  

export const updateProduct = async (id, updatedData) => {
const data = await updateData("products", id, updatedData);
return data;
};
  
  