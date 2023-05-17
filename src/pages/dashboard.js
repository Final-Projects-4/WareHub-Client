import ProfitLoss from '@/components/dataComponents/profitLoss';
import { Grid, Box } from '@chakra-ui/react';

const Dashboard = () => {
  return (
    <Grid templateRows="repeat(3, 1fr)" gap={4} minW="100%">
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        <Box bg="red.200" p={4}>
          
        </Box>
        <Box bg="blue.200" p={4}>
          {/* Content for the second column */}
        </Box>
        <Box bg="green.200" p={4}>
          {/* Content for the third column */}
        </Box>
        <Box bg="yellow.200" p={4}>
          {/* Content for the fourth column */}
        </Box>
      </Grid>
      <Grid templateColumns="4fr 1fr" gap={4}>
        <Box bg="purple.200" p={4}>
          {/* Content for the first column */}
        </Box>
        <Box bg="pink.200" p={4}>
          {/* Content for the second column */}
        </Box>
      </Grid>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <Box p={4}>
          <ProfitLoss/>
        </Box>
        <Box bg="orange.200" p={4}>
          {/* Content for the second column */}
        </Box>
        <Box bg="cyan.200" p={4}>
          {/* Content for the third column */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
