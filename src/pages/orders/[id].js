import { useState, useEffect } from "react"
import { fetchOrderById } from "@/fetching/fetchById";
import { FiSettings } from "react-icons/fi";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
import {
    Box,
    Badge, Image,
    Text, Card, Flex,
    Stack, Heading, VStack,
    Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, FormControl, FormLabel, Input, useColorMode, CardBody
} from '@chakra-ui/react';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

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
    
    return (
        <>
         <OrderDetailsCard orders={orders}/>
         </>
    );
};
export default OrderDetails;

export async function getServerSideProps(ctx) {
    const {id} = ctx.query;

    return { props: {orderId : +id} }
}

//Display order By id
const OrderDetailsCard = ({ orders, details, customer, warehouse, products }) => {
  const {colorMode} = useColorMode();
  const buttonColor = colorMode === 'dark' ? '#7289da' : '#3bd1c7';
    return (
        <Card direction={{ base: 'column', sm: 'row' }}
        borderWidth="2px"
        overflow='hidden'
        variant='outline'
        size="lg"
        p={4}
        borderColor={buttonColor}>
          {/* <Image src={order.image} objectFit='cover' borderRadius={10}
              maxW={{ base: '100%', sm: '500px' }} 
              alt={`${order.name}`}/> */}

            <CardBody>
              <Heading textAlign="center" size='md'>
                {orders.name}
              </Heading>
              <Flex justifyContent="center">
                <Badge colorScheme="green" fontSize="sm">
                  {orders.total_price}
                </Badge>
              </Flex>
              <Text textAlign="center" py='2'>
                {orders.createdAt}
              </Text>
              
              {/* <Box mb="4">
                <Text textAlign="center" fontSize="sm">
                  Price: <strong>{order.price}</strong>
                </Text>
                <Text textAlign="center" fontSize="sm">
                  Weight: <strong>{order.weight}</strong>
                </Text>
                <Text textAlign="center" fontSize="sm">
                  Size: <strong>{order.size}</strong>
                </Text>
              </Box> */}
            </CardBody>
        </Card>
    )
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
