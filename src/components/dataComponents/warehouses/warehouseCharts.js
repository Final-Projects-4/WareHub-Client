import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { allWarehouses } from '../allData';
import { useColorMode } from '@chakra-ui/react';
Chart.register(...registerables);


const BarChart = ({ data }) => {
  const { colorMode } = useColorMode();
  const barColor = colorMode === 'dark' ? '#7289da' : '#3bd1c7';
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        label: 'Products Quantity',
        data: data.flatMap((item) =>
          item.Products.map((product) => product.WarehouseStock.quantity)
        ),
        backgroundColor: barColor,
        borderSkipped: 'bottom',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Quantity',
        },
        grid: {
          display: false, // Remove y-axis grid lines
        },
      },
      x: {
        grid: {
          display: false, // Remove x-axis grid lines
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};


  
const WarehouseBar = () => {
    const { warehouses } = allWarehouses(); // Assuming allWarehouses() returns an object with the warehouses array
  
    return (
      <div>
        <BarChart data={warehouses} />
      </div>
    );
};
  
  

export default WarehouseBar;
  
