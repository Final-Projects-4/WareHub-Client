import { Card,Text,Image,Stack,Heading,Divider,Button,ButtonGroup, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

function Product({ product}) {
    const {name,price,weight,size, description,SKU,image} = product;
    return(
        <>
<Card maxW='sm'>
<Heading>Product</Heading>
  <CardBody>
    <Image
      src={image}
      alt={name}
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{name}</Heading>
      <Text>
        {description}
      </Text>
      <Text>
        Berat : {weight}
      </Text>
      <Text>
        Ukuran : {size}
      </Text>
      <Text>
        SKU : {SKU}
      </Text>
      <Text color='blue.600' fontSize='2xl'>
        Harga : {price}
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        Sunting
      </Button>
      <Button variant='ghost' colorScheme='blue'>
        Add to Inv
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
</>
    )
  }

function Warehouse({ warehouse}) {
    const {name,city,address,image} = warehouse;
    return(
        <>
<Card maxW='sm'>
<Heading>Warehouse</Heading>
  <CardBody>
    <Image
      src={image}
      alt={name}
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{name}</Heading>
      <Text>
        alamat : {address}
      </Text>
      <Text>
        Kota : {city}
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        Sunting
      </Button>
      <Button variant='ghost' colorScheme='blue'>
        Add to Inv
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
</>
    )
  }

function Categori({ categori}) {
    const {name,description,image} = categori;
    return(
        <>
<Card maxW='sm'>
<Heading>Categori</Heading>
  <CardBody>
    <Image
      src={image}
      alt={name}
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{name}</Heading>
      <Text>
        {description}
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        Sunting
      </Button>
      <Button variant='ghost' colorScheme='blue'>
        Add to Inv
      </Button>
    </ButtonGroup>
  </CardFooter>
</Card>
</>
    )
  }

const Cards = ({props,type}) => {
    switch (type) {
        case "product":
            return(
                <>
                <Product product={props} />
                </>
            )
            break;
        case "warehouse":
            return(
                <>
                <Warehouse warehouse={props}/>
                </>
            )
            break;
        case "categori":
            return(
                <>
                <Categori categori={props}/>
                </>
            )
            break;
    
        default:
            break;
    }


return( 
<>
</>
    )
};

export default Cards;