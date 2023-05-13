import React from "react";
import { Flex, Text, Icon, Link, Menu, MenuButton } from "@chakra-ui/react";

const SideItem = ({ icon, title, active, navSize, to, onClick }) => {
  return (
    <Link
      backgroundColor={active && "#ff99c8"}
      p={3}
      borderRadius={8}
      _hover={{ textDecor: "none", backgroundColor: "#ff99c8" }}
      w={navSize == "large" && "100%"}
      href={to}
      onClick={onClick}
    >
      <Flex>
        <Icon as={icon} fontSize="xl" color={active ? "#ffffff" : "#8d99ae"} />
        <Text
          ml={5}
          display={navSize == "small" ? "none" : "flex"}
          color={active ? "#ffffff" : "##8d99ae"}
        >
          {title}
        </Text>
      </Flex>
    </Link>
  );
};


export default SideItem;
