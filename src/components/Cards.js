// import { Card,Text,Image,Stack,Heading,Divider,Button,ButtonGroup, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

// function Product({ product}) {
//     const {name,price,weight,size, description,SKU,image} = product;
//     return(
//         <>
// <Card maxW='sm'>
// <Heading>Product</Heading>
//   <CardBody>
//     <Image
//       src={image}
//       alt={name}
//       borderRadius='lg'
//     />
//     <Stack mt='6' spacing='3'>
//       <Heading size='md'>{name}</Heading>
//       <Text>
//         {description}
//       </Text>
//       <Text>
//         Berat : {weight}
//       </Text>
//       <Text>
//         Ukuran : {size}
//       </Text>
//       <Text>
//         SKU : {SKU}
//       </Text>
//       <Text color='blue.600' fontSize='2xl'>
//         Harga : {price}
//       </Text>
//     </Stack>
//   </CardBody>
//   <Divider />
//   <CardFooter>
//     <ButtonGroup spacing='2'>
//       <Button variant='solid' colorScheme='blue'>
//         Sunting
//       </Button>
//       <Button variant='ghost' colorScheme='blue'>
//         Add to Inv
//       </Button>
//     </ButtonGroup>
//   </CardFooter>
// </Card>
// </>
//     )
//   }

// function Warehouse({ warehouse}) {
//     const {name,city,address,image} = warehouse;
//     return(
//         <>
// <Card maxW='sm'>
// <Heading>Warehouse</Heading>
//   <CardBody>
//     <Image
//       src={image}
//       alt={name}
//       borderRadius='lg'
//     />
//     <Stack mt='6' spacing='3'>
//       <Heading size='md'>{name}</Heading>
//       <Text>
//         alamat : {address}
//       </Text>
//       <Text>
//         Kota : {city}
//       </Text>
//     </Stack>
//   </CardBody>
//   <Divider />
//   <CardFooter>
//     <ButtonGroup spacing='2'>
//       <Button variant='solid' colorScheme='blue'>
//         Sunting
//       </Button>
//       <Button variant='ghost' colorScheme='blue'>
//         Add to Inv
//       </Button>
//     </ButtonGroup>
//   </CardFooter>
// </Card>
// </>
//     )
//   }

// function Categori({ categori}) {
//     const {name,description,image} = categori;
//     return(
//         <>
// <Card maxW='sm'>
// <Heading>Categori</Heading>
//   <CardBody>
//     <Image
//       src={image}
//       alt={name}
//       borderRadius='lg'
//     />
//     <Stack mt='6' spacing='3'>
//       <Heading size='md'>{name}</Heading>
//       <Text>
//         {description}
//       </Text>
//     </Stack>
//   </CardBody>
//   <Divider />
//   <CardFooter>
//     <ButtonGroup spacing='2'>
//       <Button variant='solid' colorScheme='blue'>
//         Sunting
//       </Button>
//       <Button variant='ghost' colorScheme='blue'>
//         Add to Inv
//       </Button>
//     </ButtonGroup>
//   </CardFooter>
// </Card>
// </>
//     )
//   }

// const Cards = ({props,type}) => {
//     switch (type) {
//         case "product":
//             return(
//                 <>
//                 <Product product={props} />
//                 </>
//             )
//             break;
//         case "warehouse":
//             return(
//                 <>
//                 <Warehouse warehouse={props}/>
//                 </>
//             )
//             break;
//         case "categori":
//             return(
//                 <>
//                 <Categori categori={props}/>
//                 </>
//             )
//             break;

//         default:
//             break;
//     }

// return(
// <>
// </>
//     )
// };

// export default Cards;

import React from "react";
import { Flex, Icon, Card, CardBody, Heading, Image, Text } from "@chakra-ui/react";
import { BsFillStarFill } from "react-icons/bs";

const Cards = ({ icon }) => {
  return (
    <>
      <Card maxW="sm">
        <Image objectFit="cover" src="card.jpg" alt="Chakra UI" borderTopRadius="xl" />
        <CardBody>
          <Heading size="xs" fontWeight="light">
            Chair
          </Heading>
          <Text fontWeight="bold">This is not play play chair.</Text>
          <Flex justifyContent="space-between" alignItems="center">
            <Text color="gray.600" fontSize="2xl" fontWeight="bold">
              $450
            </Text>
            <Flex>
              <Icon as={icon} fontSize="xl" color="#fca311">
                <BsFillStarFill />
              </Icon>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
      <Card maxW="sm" mt="10%">
        <Image objectFit="cover" src="card2.jpg" alt="Chakra UI" borderTopRadius="xl" />
        <CardBody>
          <Heading size="xs" fontWeight="light">
            Chair
          </Heading>
          <Text fontWeight="bold">This is not play play chair.</Text>
          <Flex justifyContent="space-between" alignItems="center">
            <Text color="gray.600" fontSize="2xl" fontWeight="bold">
              $450
            </Text>
            <Flex>
              <Icon as={icon} fontSize="xl" color="#fca311">
                <BsFillStarFill />
              </Icon>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
      <Card maxW="sm" mt="10%">
        <Image objectFit="cover" src="card3.jpg" alt="Chakra UI" borderTopRadius="xl" />
        <CardBody>
          <Heading size="xs" fontWeight="light">
            Chair
          </Heading>
          <Text fontWeight="bold">This is not play play chair.</Text>
          <Flex justifyContent="space-between" alignItems="center">
            <Text color="gray.600" fontSize="2xl" fontWeight="bold">
              $450
            </Text>
            <Flex>
              <Icon as={icon} fontSize="xl" color="#fca311">
                <BsFillStarFill />
              </Icon>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default Cards;
