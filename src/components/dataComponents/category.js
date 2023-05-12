import { useState } from 'react';
import { postCategory } from '@/fetching/postData';
import { Button, Collapse } from '@chakra-ui/react';


export const AddCategoryForm = () => {
  const [details, setDetails] = useState({
    name: '',
    description: ''
  })
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDetails((prev) => {
        return { ...prev, [name]: value};
    });
  };

    
    const handleSubmit = async (e) => {
      const accessToken = sessionStorage.getItem('accessToken');
        e.preventDefault();
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
        } catch (err) {
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