import { useState, useEffect } from "react";
import { allExpenses } from "./allData";
import { Button, Collapse,Box, Flex, useToast, Table, Tr, Text,  Td, Thead, Heading, Th, Tbody, HStack, Link, Spinner } from '@chakra-ui/react';
const Expenses = () => {
    //usage expenses.expenses / expenses.totalExpense
    const {expenses} = allExpenses();

    


    return(
        <> <Box>{expenses.expenses.totalExpense}</Box>
            
        </>
    )
};


export default Expenses