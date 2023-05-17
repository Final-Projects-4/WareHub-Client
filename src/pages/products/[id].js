import { useState, useEffect } from "react"
import { fetchProductById } from "@/fetching/fetchById";
import { FiSettings } from "react-icons/fi";
import {
    Box,
    Badge, Image,
    Text,
    Stack,
    Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, FormControl, FormLabel, Input
} from '@chakra-ui/react';
import { updateProduct } from "@/fetching/updateData";

const ProductDetail = ({productId}) => {
    const [product, setProduct] = useState({});
    const [isLoading, setLoading] = useState(true);
    const [dummyState, setDummyState] = useState(0); // create dummy state

    useEffect(() => {

        const fetchProduct = async () => {
          try {
            const data = await fetchProductById(productId);
            setProduct(data);
            setLoading(false);
          } catch (err) {
            setLoading(true)
          }
        };
        fetchProduct();
      }, [productId, dummyState]);

      const handleUpdate = (updatedData) => {
        setDummyState((prevState) => prevState + 1);;
      }
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
    return (
        <>
        <ProductDetailCard product={product}/>
        <ProductUpdateButton product={product} onUpdate={handleUpdate} />
        </>
    );
};
export default ProductDetail;

export async function getServerSideProps(ctx) {
    const {id} = ctx.query;

    return { props: {productId : +id} }
}

//Display Product By id
const ProductDetailCard = ({ product }) => {
    return (
        <Stack spacing="2">
        <Box borderWidth="1px" borderRadius="lg" p="4">
          <Image src={product.image} boxSize="100px"/>
          
            <Text fontSize="lg" fontWeight="bold" mb="4">
            {product.name}
            </Text>
            <Box mb="2">
            <Badge colorScheme="green" fontSize="sm">
                {product.SKU}
            </Badge>
            </Box>
            <Box mb="4">
            <Text fontSize="sm">
                Price: <strong>{product.price}</strong>
            </Text>
            <Text fontSize="sm">
                Weight: <strong>{product.weight}</strong>
            </Text>
            <Text fontSize="sm">
                Size: <strong>{product.size}</strong>
            </Text>
            </Box>
                <Text fontSize="sm">{product.description}</Text>
                <Stack direction="row" justifyContent="space-between" fontSize="sm" color="gray.500">
                <Text fontWeight="bold">Created Date:</Text>
                <Text>
                    <strong>{new Date(product.createdAt).toLocaleString()}</strong>
                </Text>
                </Stack>
                <Stack direction="row" justifyContent="space-between" fontSize="sm" color="gray.500">
                <Text fontWeight="bold">Updated Date:</Text>
                <Text>
                    <strong>{new Date(product.updatedAt).toLocaleString()}</strong>
                </Text>
                </Stack>
        </Box>
        </Stack>

    );
};

//Update Product
const ProductUpdateButton = ({ product, onUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: product.name,
      price: product.price,
      weight: product.weight,
      size: product.size,
      description: product.description,
      SKU: product.SKU,
    });

    const [imageFile, setImageFile] = useState(null)
  
    const handleInputChange = (event) => {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    };
  
    const handleUpdate = async (event) => {
      event.preventDefault();
      try {
        const updatedFormData = new FormData();
        for (const key in formData) {
          updatedFormData.append(key, formData[key]);
        }
        if (imageFile) {
          updatedFormData.append("image", imageFile);
        }
  
        const updatedData = await updateProduct(product.id, updatedFormData);
        onUpdate(updatedData);
        setIsModalOpen(false);
      } catch (err) {
        // Handle error
      }
    };

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImageFile(file);
    };
  
    return (
      <>
        <Box
        as={FiSettings}
        cursor="pointer"
        fontSize="xl"
        onClick={() => setIsModalOpen(true)}
      />
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Product</ModalHeader>
            <ModalBody>
              <FormControl id="name" mb={3}>
                <FormLabel>Name</FormLabel>
                <Input name="name" value={formData.name} onChange={handleInputChange} />
              </FormControl>
              <FormControl id="price" mb={3}>
                <FormLabel>Price</FormLabel>
                <Input name="price" type="number" value={formData.price} onChange={handleInputChange} />
              </FormControl>
              <FormControl id="weight" mb={3}>
                <FormLabel>Weight</FormLabel>
                <Input name="weight" value={formData.weight} onChange={handleInputChange} />
              </FormControl>
              <FormControl id="size" mb={3}>
                <FormLabel>Size</FormLabel>
                <Input name="size" value={formData.size} onChange={handleInputChange} />
              </FormControl>
              <FormControl id="description" mb={3}>
                <FormLabel>Description</FormLabel>
                <Input name="description" value={formData.description} onChange={handleInputChange} />
              </FormControl>
              <FormControl id="SKU" mb={3}>
                <FormLabel>SKU</FormLabel>
                <Input name="SKU" value={formData.SKU} onChange={handleInputChange} />
              </FormControl>
              <FormControl>
              <FormLabel>Image</FormLabel>
              <Input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                mb={4}
              />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
                Update
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
};
  
