import { useState } from 'react';
import { postVendor } from '@/fetching/postData';
import { Button, Collapse } from '@chakra-ui/react';


export const AddVendorForm = () => {
  const [details, setDetails] = useState({
    name: '',
    country: ''
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
          await postVendor(
            details.name,
            details.country,
            accessToken
          );
          setDetails({
            name: '',
            country: ''
          });
        } catch (err) {
        }
      };

      return (
        <>
          <Button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Cancel' : '+ Vendor'}
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
              <h3>Country</h3>{' '}
              <input
                type='text'
                name='country'
                value={details.country}
                onChange={handleChange}
              ></input>
              <Button type='submit'>Submit</Button>
            </form>
          </Collapse>
        </>
      );
};