import { useState } from 'react';
import { postCategory } from '@/fetching/postData';
import { Button, Collapse, useToast, Table, Tr, Text,  Td, Thead, Heading, Th, Tbody, HStack, Link } from '@chakra-ui/react';
import { allCategories } from './allData';
import { FiEdit, FiDivideCircle } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { deleteCategory } from '@/fetching/deleteData';
//parents
const Categories = () => {
  //usage category.categories
  
  const {category, setCategory} = allCategories();

  function handleAddCategory(details) {
    setCategory(prevData => ({
      ...prevData,
      categories: [...prevData.categories, details]
    }));
  }
  
  return (
  <>
    <AddCategoryForm
      category={category}
      handleAddCategory={handleAddCategory}
    />
    <RenderCategory 
      category={category}
      setCategory={setCategory}
    />

  </>)
}

export default Categories


export const AddCategoryForm = ({handleAddCategory}) => {
  const [details, setDetails] = useState({
    name: '',
    description: ''
  })
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDetails((prev) => {
        return { ...prev, [name]: value};
    });
  };

    
  const handleSubmit = async (e) => {
    const accessToken = sessionStorage.getItem('accessToken');
    e.preventDefault();
    handleAddCategory(details)
    try {
      await postCategory(
        details.name,
        details.description,
        accessToken
      );
      setDetails({
        name: '',
        description: ''
      });
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

    

  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Cancel' : '+ Category'}
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <form onSubmit={handleSubmit}>
          <h3>Name:</h3>{' '}
          <input
            type='text'
            name='name'
            value={details.name}
            onChange={handleChange}
          ></input>
          <h3>Description</h3>{' '}
          <input
            type='text'
            name='description'
            value={details.description}
            onChange={handleChange}
          ></input>
          <Button type='submit'>Submit</Button>
        </form>
      </Collapse>
    </>
  );
};

export const RenderCategory = ({category, setCategory}) => {
  const router = useRouter();
  const toast = useToast();
  function renderData(data) {

    return data.categories.map((c) => {

      const handleCategoryDetails = (categoryId) => {
        router.push(`/categories/${categoryId}`)
      }


      function handleDelete(categoryId) {
        const accessToken = sessionStorage.getItem('accessToken');
        deleteCategory(categoryId, accessToken)
          .then(() => {
            toast({
              title: 'Category deleted',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            setCategory((prevData) => ({ ...prevData, categories: prevData.categories.filter((c) => c.id !== categoryId) }));
          })
          .catch((error) => {
            toast({
              title: 'Error deleting Category',
              description: error.message,
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          });
      }

      return(
        <Tr key={c.id}>
            <Td>
            <HStack>
            <Link
              onClick={() => handleCategoryDetails(c.id)}
              _hover={{
                textDecoration: 'glow',
                textShadow: '0 0 8px #fff, 0 0 12px #fff, 0 0 16px #fff',
              }}
            >
              {c.name}
              <Text fontSize="sm" color="gray.500" ml={1} display="inline">
              <FiEdit />
              </Text>
            </Link>
            </HStack>
            </Td>
            <Td>
              {c.description}
            </Td> 

            <Td>
              <Button leftIcon={<FiDivideCircle />} onClick={() => handleDelete(c.id)}>Delete</Button>
            </Td>
          </Tr>
        );
    })
  }

  const tableBody = renderData(category)

  return(
    <>
      <Heading as="h2" size="lg" mb="4">
          Category List
        </Heading>
        <Table>
          <Thead style={{ position: "sticky", top: 0 }}>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
            </Tr>
          </Thead>
          <Tbody>{tableBody}</Tbody>
        </Table>
    </>
  )
}