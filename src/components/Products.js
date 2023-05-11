import { useState, useEffect } from 'react';
import { fetchCategories } from '@/fetching/fetchData';
import { postProduct } from '@/fetching/postData';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  Select,
  Textarea,
} from '@chakra-ui/react';

export const AddProductForm = () => {
  const [details, setDetails] = useState({
    name: '',
    price: 0,
    weight: 0,
    size: '',
    description: '',
    SKU: '',
    category_id: null,
  })

  const [data, setData] = useState(
    { categories:[]});

    useEffect(() => {
        Promise.all([fetchCategories()])
          .then(([categoriesData]) => {
            setData({
              categories: categoriesData
            });
          })      
          .catch(err => console.log(err));
      }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setDetails((prev) => {
            return { ...prev, [name]: value};
        });
        console.log(e.target)
    };

    const accessToken = sessionStorage.getItem('accessToken');
    const handleSubmit = async (e) => {
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
            category_id: null,
          });
        } catch (err) {
          console.log(err);
        }
      };
      return (
        <form onSubmit={handleSubmit}>
          <h3>Name:</h3>{' '}
          <input type='text' name='name' value={details.name} onChange={handleChange}></input>
          <h3>Price</h3>{' '}
          <input type='text' name='price' value={details.price} onChange={handleChange}></input>
          <h3>Weight</h3>{' '}
          <input type='text' name='weight' value={details.weight} onChange={handleChange}></input>
          <h3>Size</h3>{' '}
          <input type='text' name='size' value={details.size} onChange={handleChange}></input>
          <h3>Description</h3>{' '}
          <input type='text' name='description' value={details.description} onChange={handleChange}></input>
          <h3>SKU</h3>{' '}
          <input type='text' name='SKU' value={details.SKU} onChange={handleChange}></input>
          <h3>Category</h3>{' '}
          <select name='category_id' value={details.category_id} onChange={handleChange}>
            {data.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button type='submit' onClick={handleSubmit}>Submit</button>
        </form>
      );
};