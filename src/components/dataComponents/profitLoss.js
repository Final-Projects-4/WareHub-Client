import { allExpenses, allRevenues } from "./allData";
import { Box } from "@chakra-ui/react";

const useRevenues = () => {
    const { revenues } = allRevenues();
    const revenuesData = revenues.revenues;
    return revenuesData;
  };
  
const useExpenses = () => {
    const { expenses } = allExpenses();
    const expensesData = expenses.expenses;
    return expensesData;
};

export const ProfitLoss = () => {
    const revenuesData = useRevenues();
    const expensesData = useExpenses();
    const profit = revenuesData.totalRevenue - expensesData.totalExpense;
    const color = profit > 0 ? "teal" : "red.500";
    const message = profit > 0 ? "Profit Gains: " : "Profit Loss: "
    
    return (
        <Box
          bg={color}
          display="flex"
          minHeight="65px"
          borderRadius={10}
          maxWidth="250px"
          textAlign="center"
          justifyContent="center"
          alignItems="center"
          fontWeight="semibold"
          fontSize="lg"
          color="white"
          p={4}
          _hover={{ cursor: "pointer", transform: "scale(1.05)" }}
          transition="transform 0.2s ease"
        >
          {message} {profit}
        </Box>
    );

}