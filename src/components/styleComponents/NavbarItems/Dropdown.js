import { fetchUser } from '@/fetching/fetchData';
import { Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, useColorMode } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'




function Dropdown() {
    const { colorMode } = useColorMode();
    const buttonColor = colorMode === 'dark' ? '#7289da' : '#3bd1c7';

    const user = async () => {
        // Replace 'fetchData' with your actual fetch function
        const response = await fetchUser();
        return response;
      };
    
      const useUser = () => {
        const [data, setData] = useState({ user: [] });
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState(null);
    
        useEffect(() => {
          const fetchData = async () => {
            try {
              setIsLoading(true);
              const response = await user();
              console.log(response)
              setData(response);
              setIsLoading(false);
            } catch (err) {
              setError(err);
              setIsLoading(false);
            }
          };
          fetchData();
        }, []);
    
        return { data };
      };
    
      const { data } = useUser();


  return (
    <div>
        <Menu>
  <MenuButton as={Button} bgColor={buttonColor}>
    Profile
  </MenuButton>
  <MenuList>
    <MenuGroup  title={data.username}>
      <MenuItem as='a' href="/profile" title="Profile"  >My Account</MenuItem>
    </MenuGroup>
  </MenuList>
</Menu>
    </div>
  )
}

export default Dropdown