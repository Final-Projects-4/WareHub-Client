import { useState, useEffect } from "react"
import { fetchOrderById } from "@/fetching/fetchById";
import { FiSettings } from "react-icons/fi";
import {
    Card, Badge, Box, Image, Text, VStack, Flex, Grid, Slide
} from '@chakra-ui/react';

/*
needed data
order = 
{   order: {total_price}, 
    products: {name, image, SKU, price}, 
    warehouse: {name}, 
    customer: {first_name, last_name}, 
    details: {price, quantity, }}
*/

const OrderDetails = ({orderId}) => {
    const [order, setOrder] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [dummyState, setDummyState] = useState(0); // create dummy state

    useEffect(() => {

        const fetchOrder = async () => {
          try {
            const data = await fetchOrderById(orderId);
            setOrder(data);
            setLoading(false);
          } catch (err) {
            setLoading(true)
          }
        };
        fetchOrder();
      }, [orderId, dummyState]);

      if (isLoading) {
        return <div>Loading...</div>;
      }

    
    const orders = order.order //object .total_price .name 1
    const details = order.details //[{},{}] map product_id quantity price
    const customer = order.customer // .first_name .last_name 1
    const warehouse = order.warehouse // .name 1
    const products = order.products //[] .SKU .price .name .image // .OrderProduct.price / quantity .createdAt
    console.log(products)
    return (
        <>
         <OrderDetailsCard orders={orders} details={details} customer={customer} warehouse={warehouse} products={products}/>
         </>
    );
};
export default OrderDetails;

export async function getServerSideProps(ctx) {
    const {id} = ctx.query;

    return { props: {orderId : +id} }
}

//Display Order By id
const OrderDetailsCard = ({ orders, details, customer, warehouse, products }) => {

    const totalQuantity = products.reduce(
        (total, product) => total + product.OrderProduct.quantity,
        0
      );


      return (
        <Card maxW="md" p="4" boxShadow="md">
          <VStack spacing="4" align="start">
            <Box>
              <Text fontWeight="bold">Order Details</Text>
              <Flex justifyContent="space-between">
                <Text>Customer: {customer.first_name}</Text>
                <Text>Warehouse: {warehouse.name}</Text>
              </Flex>
              <Flex justifyContent="space-between">
                <Text>Total Price: {orders.total_price}</Text>
                <Text>Total Quantity: {totalQuantity}</Text>
              </Flex>
            </Box>
    
            <Box>
              <Text fontWeight="bold">Products</Text>
              <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap="4">
                {products.map((product) => (
                  <SlideableCard key={product.SKU} product={product} />
                ))}
              </Grid>
            </Box>
          </VStack>
        </Card>
      );
};

const SlideableCard = ({ product }) => {
    return (
      <Card maxW="sm" p="4" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <VStack spacing="2" align="start">
          <Image src={product.image} alt={product.name} boxSize="200px" objectFit="cover" />
          <Text fontWeight="bold">{product.name}</Text>
          <Badge size="sm" colorScheme="green">{product.SKU}</Badge>
          <Text>Base Price: {product.price}</Text>
          <Text fontWeight="bold">Order Details:</Text>
          <Text>
            Price: {product.OrderProduct.price} | Quantity: {product.OrderProduct.quantity}
          </Text>
        </VStack>
      </Card>
    );
  };
  

// //Update order
// const orderUpdateButton = ({ order, onUpdate }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [formData, setFormData] = useState({
//       name: order.name,
//       price: order.price,
//       weight: order.weight,
//       size: order.size,
//       description: order.description,
//       SKU: order.SKU,
//     });

//     const [imageFile, setImageFile] = useState(null)
  
//     const handleInputChange = (event) => {
//       setFormData({ ...formData, [event.target.name]: event.target.value });
//     };
  
//     const handleUpdate = async (event) => {
//       event.preventDefault();
//       try {
//         const updatedFormData = new FormData();
//         for (const key in formData) {
//           updatedFormData.append(key, formData[key]);
//         }
//         if (imageFile) {
//           updatedFormData.append("image", imageFile);
//         }
  
//         const updatedData = await updateorder(order.id, updatedFormData);
//         onUpdate(updatedData);
//         setIsModalOpen(false);
//       } catch (err) {
//         // Handle error
//       }
//     };

//     const handleImageChange = (e) => {
//       const file = e.target.files[0];
//       setImageFile(file);
//     };
//     const {colorMode} = useColorMode()
//     const buttonColor = colorMode === 'dark' ? '#7289da' : '#3bd1c7';
//     return (
//       <>
//         <Box
//         as={FiSettings}
        
//         cursor="pointer"
//         fontSize="xl"
//         onClick={() => setIsModalOpen(true)}
//       />
//         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//           <ModalOverlay />
//           <ModalContent>
//             <ModalHeader>Edit order</ModalHeader>
//             <ModalBody>
//               <FormControl id="name" mb={3}>
//                 <FormLabel>Name</FormLabel>
//                 <Input name="name" value={formData.name} onChange={handleInputChange} />
//               </FormControl>
//               <FormControl id="price" mb={3}>
//                 <FormLabel>Price</FormLabel>
//                 <Input name="price" type="number" value={formData.price} onChange={handleInputChange} />
//               </FormControl>
//               <FormControl id="weight" mb={3}>
//                 <FormLabel>Weight</FormLabel>
//                 <Input name="weight" value={formData.weight} onChange={handleInputChange} />
//               </FormControl>
//               <FormControl id="size" mb={3}>
//                 <FormLabel>Size</FormLabel>
//                 <Input name="size" value={formData.size} onChange={handleInputChange} />
//               </FormControl>
//               <FormControl id="description" mb={3}>
//                 <FormLabel>Description</FormLabel>
//                 <Input name="description" value={formData.description} onChange={handleInputChange} />
//               </FormControl>
//               <FormControl id="SKU" mb={3}>
//                 <FormLabel>SKU</FormLabel>
//                 <Input name="SKU" value={formData.SKU} onChange={handleInputChange} />
//               </FormControl>
//               <FormControl>
//               <FormLabel>Image</FormLabel>
//               <Input
//                 name="image"
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 mb={4}
//               />
//               </FormControl>
//             </ModalBody>
//             <ModalFooter>
//               <Button bgColor={buttonColor} mr={3} onClick={handleUpdate}>
//                 Update
//               </Button>
//               <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
//             </ModalFooter>
//           </ModalContent>
//         </Modal>
//       </>
//     );
// };

// const StocksChart = ({stocks}) => {
// // Extracting warehouse IDs and quantities from the stocks data
// const warehouseIds = stocks.map((stock) => stock.id);
// const quantities = stocks.map((stock) => stock.WarehouseStock.quantity);

// // Generate random colors for the chart
// const randomColors = warehouseIds.map(() => {
//   const hue = Math.floor(Math.random() * 360); // Random hue value between 0 and 360
//   const saturation = Math.floor(Math.random() * 30) + 70; // Random saturation value between 70 and 100
//   const lightness = Math.floor(Math.random() * 30) + 70; // Random lightness value between 70 and 100

//   return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
// });

// // Prepare the chart data
// const data = {
//   labels: warehouseIds.map((id) => `Warehouse ${id}`),
//   datasets: [
//     {
//       data: quantities,
//       backgroundColor: randomColors,
//     },
//   ],
// };

// return <Doughnut data={data}/>;
// };
