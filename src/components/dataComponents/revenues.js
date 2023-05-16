import { useState, useEffect } from "react";
import { allRevenues } from "./allData";
import { Button, Collapse, Flex, useToast, Table, Tr, Text,  Td, Thead, Heading, Th, Tbody, HStack, Link, Spinner, Box } from '@chakra-ui/react';
const Revenues = () => {
    //usage revenues.revenues / revenues.revenues.totalRevenue
    const {revenues} = allRevenues();

    


    return(
        <><Box>{revenues.revenues.totalRevenue}</Box>
            
        </>
    )
};


export default Revenues