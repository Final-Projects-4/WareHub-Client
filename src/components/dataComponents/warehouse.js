import { useState } from 'react';
import { postWarehouse } from '@/fetching/postData';
import { Button, Collapse } from '@chakra-ui/react';


export const AddWarehouseForm = () => {
  const [details, setDetails] = useState({
    name: '',
    city: '',
    address: ''
  })
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDetails((prev) => {
        return { ...prev, [name]: value};
    });
  };

    const accessToken = sessionStorage.getItem('accessToken');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await postWarehouse(
            details.name,
            details.city,
            details.address,
            accessToken
          );
          setDetails({
            name: '',
            city: '',
            address: ''
          });
        } catch (err) {
        }
      };

      return (
        <>
          <Button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Cancel' : '+ Warehouses'}
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
              <h3>city</h3>{' '}
              <input
                type='text'
                name='city'
                value={details.city}
                onChange={handleChange}
              ></input>
              <h3>Address</h3>{' '}
              <input
                type='text'
                name='address'
                value={details.address}
                onChange={handleChange}
              ></input>
              <Button type='submit'>Submit</Button>
            </form>
          </Collapse>
        </>
      );
};