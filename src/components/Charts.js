import { PieChart, PieChartLabel } from "@chakra-ui/react";

const PieChartExample = () => {
  const data = [
    {
      label: "Apples",
      value: 25,
    },
    {
      label: "Oranges",
      value: 30,
    },
    {
      label: "Bananas",
      value: 20,
    },
    {
      label: "Grapes",
      value: 25,
    },
  ];

  return (
    <PieChart data={data}>
      <PieChartLabel />
    </PieChart>
  );
};

export default PieChartExample;
