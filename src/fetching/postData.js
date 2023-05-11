import { baseUrl } from "./fetchData";

export async function postLoginData(username, password) {
    const response = await fetch(`${baseUrl}users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
}

export async function postProduct(
  name, price, weight, size, description, SKU, category_id, accessToken
) {
  const response = await fetch(`${baseUrl}products/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      name,
      price,
      weight,
      size,
      description,
      SKU,
      category_id,
    })
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  return data;
};