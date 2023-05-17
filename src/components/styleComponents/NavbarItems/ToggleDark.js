import { useColorMode, Button } from "@chakra-ui/react";
import { FiSun, FiMoon } from "react-icons/fi";

const ToggleColorButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      variant="ghost"
      onClick={toggleColorMode}
      top="0"
      right="0"
      m="1rem"
    >
      {colorMode === "dark" ? (
        <FiSun color="orange" />
      ) : (
        <FiMoon color="blue" />
      )}
    </Button>
  );
};

export default ToggleColorButton;
