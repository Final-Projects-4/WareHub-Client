import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { postProduct, postStock, bulkInsertProducts } from '@/fetching/postData';
import { InputGroup, IconButton, ModalFooter, HStack, useToast, Link, FormControl, FormLabel, Text, Button, Card, Box, Input, Flex,Table, Thead, Tbody, Tr, Th, Td, Select, Heading, Badge, Image, useColorMode} from "@chakra-ui/react";
import { allProducts, allVendors, allWarehouses, allCategories} from './allData';
import { FiSearch, FiEdit,FiUpload, FiPlus, FiArrowLeft, FiArrowRight
 ,FiCircle,
 FiArrowUpRight,
 FiDelete}  from 'react-icons/fi';
import { deleteProduct } from '@/fetching/deleteData';
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Accordion
,ModalBody,AccordionItem,AccordionButton,AccordionIcon,AccordionPanel, Icon, useMediaQuery } from '@chakra-ui/react';
//Parent
function Product() {
  const [dummyState, setDummyState] = useState(0); // Create dummy state
  
  const [filters, setFilters] = useState({
    warehouse_id: '',
    category_id: '',
    vendor_id: '',
    page: 1,
    limit: 5,
    q: '',
    sort: ''
  });
  const { data, setData} = allProducts({ filters, dummyState });
  const { totalItems, totalPages} = data;
  const { warehouses } = allWarehouses();

  function handleAddProduct(details) {
    setData(prevData => ({
      ...prevData,
      products: [...prevData.products, details]
    }));
    setDummyState(prevState => prevState + 1); // Update dummy state
  }

  function handleApplyFilters() {
    setDummyState(prevState => prevState + 1);
  }

  const { vendors } = allVendors();
  const { category} = allCategories();


  return(
    <Box>
      <HStack justify="space-between">
        <AddProductForm category={category} handleAddProduct={handleAddProduct} />
        <AddStockForm 
        data={data} 
        setData={setData} 
        handleAddProduct={handleAddProduct}
        warehouses={warehouses}
        vendors={vendors}/>
      </HStack>
      
      <FilterForm 
      filters={filters} 
      setFilters={setFilters} 
      handleApplyFilters={handleApplyFilters}
      warehouses={warehouses}
      vendors={vendors} 
      category={category}
      pageOptions={Array.from({length: totalPages}, (_, i) => i + 1)}
      totalItems={totalItems}
      data={data}
      setData={setData}
      />
    </Box>
  )
  
}
export default Product;

//Add Product
export const AddProductForm = ({ handleAddProduct, category }) => {
  const [details, setDetails] = useState({
    name: '',
    price: 0,
    weight: 0,
    size: '',
    description: '',
    SKU: '',
    category_id: 0,
    image: ''
  })
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  
  const handleSubmit = async (e) => {
    const accessToken = sessionStorage.getItem('accessToken');
      e.preventDefault();
      handleAddProduct(details);
      try {
        await postProduct(
          details.name,
          details.price,
          details.weight,
          details.size,
          details.description,
          details.SKU,
          details.category_id,
          details.image,
          accessToken
        );
        setDetails({
          name: '',
          price: 0,
          weight: 0,
          size: '',
          description: '',
          SKU: '',
          category_id: 0,
          image: ''
        });
        handleCloseModal();
        toast({
          title: 'Product created.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        } catch (err) {
          toast({
            title: 'Failed to create product.',
            description: err.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
  };

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDetails((prev) => {
        return { ...prev, [name]: value};
    });
  };

  const handleImageChange = (e) => {
    setDetails((prev) => {
      return { ...prev, image: e.target.files[0] };
    });
  };
  const {colorMode} = useColorMode();
  const buttonColor = colorMode === 'dark' ? '#7289da' : '#3bd1c7';
  return (
    <Box>
          <Button size="sm" bgColor={buttonColor} leftIcon={<FiPlus/>} onClick={handleOpenModal}>
            Add Product
          </Button>
            <Modal isOpen={isOpen} onClose={handleCloseModal}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader textAlign="center">Create Product</ModalHeader>
                <ModalBody>

            <Input
              size="sm"
              placeholder="Name"
              name="name"
              value={details.name}
              onChange={handleChange}
              mb={4}
            />
            <Input
              size="sm"
              placeholder="Price"
              name="price"
              value={details.price}
              onChange={handleChange}
              mb={4}
            />
            <Input
              size="sm"
              placeholder="Weight"
              name="weight"
              value={details.weight}
              onChange={handleChange}
              mb={4}
            />
            <Input
              size="sm"
              placeholder="Size"
              name="size"
              value={details.size}
              onChange={handleChange}
              mb={4}
            />
            <Input
              size="sm"
              placeholder="Description"
              name="description"
              value={details.description}
              onChange={handleChange}
              mb={4}
            />
            <Input
              size="sm"
              placeholder="SKU"
              name="SKU"
              value={details.SKU}
              onChange={handleChange}
              mb={4}
            />
            <Select
              variant="filled"
              size="sm"
              placeholder="category"
              name="category_id"
              value={details.category_id}
              onChange={handleChange}
              mb={4}
            >
              {category.categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
            <Input
              variant="filled"
              size="sm"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              mb={4}
            />
            </ModalBody>
            <ModalFooter>
            <Button size="sm" bgColor={buttonColor} onClick={handleSubmit}>
              Submit
            </Button>
            <Button size="sm" colorScheme="gray" onClick={handleCloseModal} ml={2}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

//Bulk Add Product
export const BulkInsertForm = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const {colorMode} = useColorMode();

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = sessionStorage.getItem('accessToken');
    setIsLoading(true);
    try {
      await bulkInsertProducts(file, accessToken);
      setFile(null);
      toast({
        title: 'Bulk insert successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: 'Failed to perform bulk insert',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const buttonCollor = colorMode === 'dark' ? '#7289da' : '#3bd1c7';
  const imageUrl = colorMode === 'dark' ? 'darkBulk.png' : 'https://img.freepik.com/free-vector/checking-boxes-concept-illustration_114360-2465.jpg?w=740&t=st=1684387560~exp=1684388160~hmac=e225f2314b5666af1ce71c24159d0e45587d38a74f171444232d2e4243fef2a1'

  return (
    <>
      <Button backgroundColor={buttonCollor} onClick={onOpen}>
        Bulk Insert
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Bulk Insert Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div style={{ display: 'flex' }}>
              <img src={imageUrl}/>
              <div>
                <Accordion defaultIndex={[0]} allowMultiple>
                  <AccordionItem>
                    <AccordionButton>
                      <Box flex="1" textAlign="left" colorScheme="teal">
                        Data Format
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      The data in the file should be formatted in a specific way, you can see the example on product list page
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        Data Validation
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      Validate the data for any required fields, constraints, or business rules...
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                      Error Handling
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                      Don't worry any invalid data would cancel out every insertion
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <FormControl mt={4}>
                <FormLabel htmlFor="file">
                  <Icon as={FiUpload} boxSize={6} mr={2} />
                </FormLabel>
                <Input type="file" id="file" accept=".csv" onChange={handleChange} />
              </FormControl>
              <Button type="submit" justifyContent="center" backgroundColor={buttonCollor} mt={4} isLoading={isLoading} loadingText="Uploading">
                Upload
              </Button>
            </form>

          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

//Add Stock Form
export const AddStockForm = ({ data, setData, warehouses, vendors, handleAddProduct }) => {
  //data needed: products , vendors, warehouses
    
    const toast = useToast();
    const [isOpen, setIsOpen] = useState(false);
    
    const [details, setDetails] = useState({
      product_id: 1,
      quantity: 1,
      vendor_id: 1,
      warehouse_id: 1
    })
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (value === '') {
        setDetails((prev) => ({ ...prev, [name]: 0 }));
      } else {
        const quantity = parseInt(value);
        setDetails((prev) => ({ ...prev, [name]: quantity }));
      }
    };
    
    const handleSubmit = async (e) => {
        const accessToken = sessionStorage.getItem('accessToken');
          e.preventDefault();
          handleAddProduct(details);
          try {
            await postStock(
              details.product_id,
              details.quantity,
              details.vendor_id,
              details.warehouse_id,
              accessToken
            );
            setDetails({
              product_id: 0,
              quantity: 1,
              vendor_id: 0,
              warehouse_id: 0
            });
            setData(prevData => ({
              ...prevData,
              products: [...prevData.products, details]
            }));
            handleCloseModal();
            toast({
              title: 'Stocks Added.',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
            handleCloseModal();
          } catch (err) {
            toast({
              title: 'Failed to add stocks.',
              description: err.message,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
      };

      const handleOpenModal = () => {
        setIsOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsOpen(false);
      };

      const {colorMode} = useColorMode();
      const buttonColor = colorMode === 'dark' ? '#7289da' : '#3bd1c7';
    return (
          <>
      <Button size="sm" bgColor={buttonColor} leftIcon={<FiArrowUpRight/>} onClick={handleOpenModal}>
        {isOpen ? 'Cancel' : 'Stocks'}
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Stock Form</ModalHeader>
          <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Product</FormLabel>
              <Select
                name="product_id"
                value={details.product_id}
                onChange={handleChange}
              >
                {data.products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Quantity</FormLabel>
              <Input
                type="text"
                name="quantity"
                value={details.quantity}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Vendor</FormLabel>
              <Select
                name="vendor_id"
                value={details.vendor_id}
                onChange={handleChange}
              >
                {vendors.map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Warehouse</FormLabel>
              <Select
                name="warehouse_id"
                value={details.warehouse_id}
                onChange={handleChange}
              >
                {warehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </form>
          </ModalBody>
          <ModalFooter>
            <Button bgColor={buttonColor} onClick={handleSubmit}>
              Submit
            </Button>
            <Button colorScheme="gray" onClick={handleCloseModal} ml={2}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

//filter and render component
function FilterForm({ filters, setFilters, warehouses, vendors, category, totalItems, handleApplyFilters, pageOptions, data, setData}) {
  //category.categories
  const [updatedFilters, setUpdatedFilters] = useState(filters);
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const limitOptions = [
    { label: "5", value: 5 },
    { label: "10", value: 10 },
    { label: "15", value: 15 },
    { label: "20", value: 20 },
  ];

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === 'page') {
      onPageChange({ ...filters, [name]: value });
    } else {
      setUpdatedFilters(prevFilters => ({
        ...prevFilters,
        [name]: value
      }));
    }
  };
  
  function handleSubmit(e) {
    e.preventDefault();
    setFilters(updatedFilters);
    handleApplyFilters();
    handleCloseModal();
  }

  const handleClearFilters = () => {
    setFilters({ q: "", warehouse_id: "", category_id: "", vendor_id: "", page: 1, sort: ''});
    setUpdatedFilters({ q: "", warehouse_id: "", category_id: "", vendor_id: "", page: 1, sort: ''});
    document.getElementsByName("warehouse_id")[0].selectedIndex = 0;
    document.getElementsByName("category_id")[0].selectedIndex = 0;
    document.getElementsByName("vendor_id")[0].selectedIndex = 0;
    document.getElementById("q").value = "";
    document.getElementById("sort")[0].selectedIndex = 0;

  };
  

  const {colorMode} = useColorMode();
  const buttonColor = colorMode === 'dark' ? '#da7272' : '#fb997b';
  function renderProduct(data) {
    return data.map((p) => {
      const warehousesForProduct = p.Warehouses ? p.Warehouses.map((w) => ({
        id: p.id,
        name: w.name,
        WarehouseStock: w.WarehouseStock,
      })) : [];

      const totalQuantity = warehousesForProduct.reduce((acc, w) => acc + w.WarehouseStock.quantity, 0);

      const vendorsForProduct = p.Vendors ? p.Vendors.map((v) => ({
        id: p.id,
        name: v.name,
      })) : [];

      const warehouseSelect =
        warehousesForProduct.length > 1 ? (
          <Select variant="unstyled">
            {warehousesForProduct.map((w) => (
              <option key={w.name}>
                {w.name} Q({w.WarehouseStock.quantity})
              </option>
            ))}
          </Select>
        ) : (
          <span>
            {warehousesForProduct[0]?.name} ({warehousesForProduct[0]?.WarehouseStock.quantity})
          </span>
        );

      const vendorSelect =
        vendorsForProduct.length > 1 ? (
          <Select variant="unstyled">
            {vendorsForProduct.map((v) => (
              <option key={v.name}>{v.name}</option>
            ))}
          </Select>
        ) : (
          <span>{vendorsForProduct[0]?.name}</span>
        );


        function handleDelete(productId) {
          const accessToken = sessionStorage.getItem('accessToken');
          deleteProduct(productId, accessToken)
            .then(() => {
              toast({
                title: 'Product deleted',
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
              setData((prevData) => ({ ...prevData, products: prevData.products.filter((p) => p.id !== productId) }));
            })
            .catch((error) => {
              toast({
                title: 'Error deleting product',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
            });
        }

        const handleProductDetails = (productId) => {
          router.push(`/products/${productId}`)
        }
        return (
          <Tr key={p.id}>
            <Td>
            <HStack>
            <Link
              onClick={() => handleProductDetails(p.id)}
              _hover={{
                textDecoration: 'glow',
                textShadow: '0 0 8px #fff, 0 0 12px #fff, 0 0 16px #fff',
              }}
            >
              {p.name}
              <Text fontSize="sm" color="gray.500" ml={1} display="inline">
              <FiEdit />
              </Text>
            </Link>
            </HStack>
              </Td>
              <Td>
              {p.Categories && p.Categories.map((c) => (
                <span key={c.id}>{c.name}</span>
              ))}
            </Td> 

            <Td>{warehouseSelect}</Td>
            <Td>{vendorSelect}</Td>
            <Td>{totalQuantity}</Td>
            <Td>
            <Image src={p.image}boxSize="50px" objectFit="cover" />
            </Td>
            <Td>
              <Button size="sm"  bgColor={buttonColor} leftIcon={<FiDelete />} onClick={() => handleDelete(p.id)}></Button>
            </Td>
          </Tr>
        );
    });
  };
  
  function PageSelect({ filters, pageOptions, onPageChange }) {
    function handleChange(event) {
      const { name, value } = event.target;
      onPageChange({ ...filters, [name]: value });
    }
    function handlePrevPage() {
      if (filters.page > 1) {
        onPageChange({ ...filters, page: filters.page - 1 });
      }
    }
  
    function handleNextPage() {
      if (filters.page < pageOptions.length) {
        onPageChange({ ...filters, page: filters.page + 1 });
      }
    }
    
    return (
      <Flex alignItems="center">
        <IconButton
          icon={<FiArrowLeft />}
          aria-label="Previous page"
          onClick={handlePrevPage}
          mr={2}
        />
        <Select
          id="page"
          name="page"
          value={filters.page}
          onChange={handleChange}
          flex={1}
        >
          {pageOptions.map((page) => (
            <option key={page} value={page}>
              {page}
            </option>
          ))}
        </Select>
        <IconButton
          icon={<FiArrowRight />}
          aria-label="Next page"
          onClick={handleNextPage}
          ml={2}
        />
      </Flex>
    );
  }
  
  const tableBody = renderProduct(data.products);

  const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");
  return (
          <>
            <Modal isOpen={isOpen} onClose={handleCloseModal}>
              <ModalOverlay />
                <ModalContent>
                  <ModalHeader textAlign="center">Filters</ModalHeader>
                    <ModalCloseButton />
                      <ModalBody>
                      <InputGroup mr={2} spacing={2}>
                          {/* Warehouse */}
                          
                          <Select
                            variant='filled'
                            size='sm'
                            type="text"
                            name="warehouse_id"
                            defaultValue={filters.warehouse_id}
                            onChange={handleChange}
                            
                          >
                            <option value="" disabled>Warehouse</option>
                            {warehouses.map((w) => {
                              return (
                                <option key={w.id} value={w.id}>
                                  {w.name}
                                </option>
                              );
                            })}
                          </Select>

                          {/* Category */}
                          
                          <Select
                            variant='filled'
                            type="text"
                            name="category_id"
                            defaultValue={filters.category_id}
                            onChange={handleChange}
                            size='sm'
                          >
                            <option value="" disabled>Category</option>
                            {category.categories.map((c) => {
                              return (
                                <option key={c.id} value={c.id}>
                                  {c.name}
                                </option>
                              );
                            })}
                          </Select>

                          {/* Vendor */}
                          
                          <Select
                            
                            variant='filled'
                            type="text"
                            name="vendor_id"
                            defaultValue={filters.vendor_id}
                            onChange={handleChange}
                            size='sm'
                          >
                            <option value="" disabled>Vendors</option>
                            {vendors.map((v) => {
                              return (
                                <option key={v.id} value={v.id}>
                                  {v.name}
                                </option>
                              );
                            })}
                          </Select>
                          {/* {Q SEARCH} */}
                      
                          <Input
                            variant='filled'
                            size='sm'
                            type="text"
                            id="q"
                            name="q"
                            defaultValue={filters.q}
                            onChange={handleChange}
                            placeholder="Name..."
                            focusBorderColor='white'
                          />
                          
                        </InputGroup>
                        <FormControl>
                          <FormLabel htmlFor="limit">Limit</FormLabel>
                            <Select size="sm" id="limit" name="limit" defaultValue={filters.limit} onChange={handleChange}>
                              {limitOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label} ({totalItems > 0 ? Math.min(totalItems, option.value) : 0} items)
                                </option>
                              ))}
                            </Select>
                            <FormLabel  size="sm" htmlFor="page">Page</FormLabel>
                          <PageSelect size="sm" filters={filters} pageOptions={pageOptions} onPageChange={setFilters} />
                            <FormLabel size="sm" htmlFor="sort">Sort</FormLabel>
                            <Select
                              id="sort"
                              name="sort"
                              defaultValue={filters.sort}
                              onChange={handleChange}
                              size="sm"
                            >
                              <option value="">None</option>
                              <option value="name:ASC">Name (A-Z)</option>
                              <option value="name:DESC">Name (Z-A)</option>
                            </Select>
                        </FormControl>
                        <Flex justify="space-between">
                        <Button mt={2} size="sm" onClick={handleSubmit} leftIcon={<FiSearch />}>
                            Apply
                          </Button>
                          <Button 
                          mt={2}
                          onClick={handleClearFilters}
                          leftIcon={<FiCircle />}
                          size="sm"
                          >
                          Clear
                          </Button>
                        </Flex>
                      </ModalBody>
                  </ModalContent>
            </Modal>
            {/* {RENDER PRODUCTS} */}
             {/* {Search by} */}
            
             <Box 
                align="center" 
                justify="center" 
                direction="column" 
                p={4}>
                  <Flex justify="space-between">
                    <Heading as="h2" size="lg" mb="4" mx="auto">
                      Product List
                    </Heading>
                    <Button rightIcon={<FiSearch/>} onClick={handleOpenModal} p={4} variant="outline">
                      Search
                    </Button>
                  </Flex>
                  <Table size='md' maxWidth="100%" variant="simple">
                    <Thead style={{ position: "sticky", top: 0 }}>
                      <Tr>
                        <Th>Lists</Th>
                        <Th>Category</Th>
                        <Th>Warehouse</Th>
                        <Th>Vendor</Th>
                        <Th>Quantity</Th>
                        <Th>Image</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>{tableBody}</Tbody>
                  </Table>
               </Box>
          </>
  );
}

//low Stock alert
export const LowStockAlert = ({ data }) => {
  const hasLowStock = (product) => {
    return product.Warehouses.some(
      (warehouse) =>
        warehouse.WarehouseStock.quantity >= 1 &&
        warehouse.WarehouseStock.quantity < 10
    );
  };

  const [sufficientStock, setSufficientStock] = useState(true);

  useEffect(() => {
    const hasSufficientStock = data.every((product) => !hasLowStock(product));
    setSufficientStock(hasSufficientStock);
  }, [data]);

  return (
    <Card p={4} borderRadius="md" boxShadow="md" color="gray.400">
      <Text fontSize="lg" fontWeight="bold" mb={2} textAlign="center">
        Stock Alert
      </Text>
      {data.length > 0 ? (
        data.map((product) => (
          hasLowStock(product) && (
            <Card key={product.id} mb={2} boxShadow="md" color="gray.400">
              <Text textAlign="center">{product.name}</Text>
              <Badge colorScheme="red" variant="subtle" ml={2}>
                Low Stock
              </Badge>
              <Box p={2} mt={2} borderRadius="md" bgColor="gray.50">
                at{' '}
                {product.Warehouses.filter(
                  (warehouse) =>
                    warehouse.WarehouseStock.quantity >= 1 &&
                    warehouse.WarehouseStock.quantity < 10
                ).map((warehouse) => warehouse.name).join(', ')}
              </Box>
            </Card>
          )
        ))
      ) : (
        <Box textAlign="center">
          {sufficientStock ? (
            <Text color="green.500">Stocks sufficient</Text>
          ) : (
            <>
              <Text color="green.500">Stocks sufficient</Text>
              <Image src="darkCustomer.png" />
            </>
          )}
        </Box>
      )}
    </Card>
  );
};






