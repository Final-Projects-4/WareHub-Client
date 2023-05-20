import { fetchUser } from '@/fetching/fetchData';
import React, { useEffect, useState } from 'react'

function index() {
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
        <h1>Profile</h1>
        <h2>Nama Depan : {data.first_name} </h2>
        <h2>Nama Belakang : {data.last_name} </h2>
        <h2>Email : {data.email} </h2>
        <h2>Username : {data.username} </h2>
        <h2>Alamat : {data.address} </h2>
        <h2>Nama Perusahaan : {data.company} </h2>
        {/* {data.id} */}
    </div>
  )
}

export default index