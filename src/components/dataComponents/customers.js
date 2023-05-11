import { useState } from 'react';
import { postCustomer } from '@/fetching/postData';
import { Button, Collapse } from '@chakra-ui/react';


export const AddCustomerForm = () => {
  const [details, setDetails] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    company: ''
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
          await postCustomer(
            details.first_name,
            details.last_name,
            details.email,
            details.address,
            details.company,
            accessToken
          );
          setDetails({
            first_name: '',
            last_name: '',
            email: '',
            address: '',
            company: ''
          });
        } catch (err) {
        }
      };

      return (
        <>
          <Button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Cancel' : '+ Customer'}
          </Button>
          <Collapse in={isOpen} animateOpacity>
            <form onSubmit={handleSubmit}>
              <h3>First Name</h3>{' '}
              <input
                type='text'
                name='first_name'
                value={details.first_name}
                onChange={handleChange}
              ></input>
              <h3>Last Name</h3>{' '}
              <input
                type='text'
                name='last_name'
                value={details.last_name}
                onChange={handleChange}
              ></input>
              <h3>Email</h3>{' '}
              <input
                type='text'
                name='email'
                value={details.email}
                onChange={handleChange}
              ></input>
              <h3>Address</h3>{' '}
              <input
                type='text'
                name='address'
                value={details.address}
                onChange={handleChange}
              ></input>
              <h3>Company</h3>{' '}
              <input
                type='text'
                name='company'
                value={details.company}
                onChange={handleChange}
              ></input>
              <Button type='submit'>Submit</Button>
            </form>
          </Collapse>
        </>
      );
};