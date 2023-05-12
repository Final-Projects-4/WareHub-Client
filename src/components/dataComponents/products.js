import { useState } from 'react';
import { postProduct } from '@/fetching/postData';
import { allCategories } from './allData';
import { Button, Collapse } from '@chakra-ui/react';


export const AddProductForm = () => {
  const { data, setData } = allCategories();
  const [details, setDetails] = useState({
    name: '',
    price: 0,
    weight: 0,
    size: '',
    description: '',
    SKU: '',
    category_id: 1,
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
          await postProduct(
            details.name,
            details.price,
            details.weight,
            details.size,
            details.description,
            details.SKU,
            details.category_id,
            accessToken
          );
          setDetails({
            name: '',
            price: 0,
            weight: 0,
            size: '',
            description: '',
            SKU: '',
            category_id: 1,
          });
          
        } catch (err) {
        }
      };

      return (
        <>
          <Button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? 'Cancel' : '+ Product'}
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
              <h3>Price</h3>{' '}
              <input
                type='text'
                name='price'
                value={details.price}
                onChange={handleChange}
              ></input>
              <h3>Weight</h3>{' '}
              <input
                type='text'
                name='weight'
                value={details.weight}
                onChange={handleChange}
              ></input>
              <h3>Size</h3>{' '}
              <input
                type='text'
                name='size'
                value={details.size}
                onChange={handleChange}
              ></input>
              <h3>Description</h3>{' '}
              <input
                type='text'
                name='description'
                value={details.description}
                onChange={handleChange}
              ></input>
              <h3>SKU</h3>{' '}
              <input
                type='text'
                name='SKU'
                value={details.SKU}
                onChange={handleChange}
              ></input>
              <h3>Category</h3>{' '}
              <select
                name='category_id'
                value={details.category_id}
                onChange={handleChange}
              >
                {data.categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <Button type='submit'>Submit</Button>
            </form>
          </Collapse>
        </>
      );
};