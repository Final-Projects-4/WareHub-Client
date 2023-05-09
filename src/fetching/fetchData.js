export const baseUrl = 'http://localhost:3001/'


//Data Fetching function, just change the url parameters when calling fetchData('example')
const fetchData = async (url) => {
    const response = await fetch(`${baseUrl}${url}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        }
    });
    const data = await response.json();
    return data;
}

export const fetchProducts = async () => {
    const data = await fetchData('products');
    return data.products;
};

export const fetchOrders = async () => {
    const data = await fetchData('orders');
    return data.data;
};
