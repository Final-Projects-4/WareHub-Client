import React, { useState } from "react";
import { Flex, Text, IconButton, Divider, Avatar, Heading } from "@chakra-ui/react";
import { FiMenu, FiHome, FiFolder, FiDollarSign, FiSmile, FiShoppingCart } from "react-icons/fi";
import SideItem from "../components/SideItem";

const Sidebar = () => {
  const [navSize, changeNavSize] = useState("large");
  return (
    <>
      <Flex
        ml={10}
        pos="sticky"
        h="auto"
        marginTop="2.5vh"
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
        borderRadius={navSize == "small" ? "15px" : "30px"}
        w={navSize == "small" ? "75px" : "200px"}
        flexDir="column"
        justifyContent="space-between"
      >
        <Flex p="5%" flexDir="column" w="100%" alignItems={navSize == "small" ? "center" : "flex-start"} as="nav">
          <IconButton
            background="none"
            mt={5}
            _hover={{ background: "none" }}
            icon={<FiMenu />}
            onClick={() => {
              if (navSize == "small") changeNavSize("large");
              else changeNavSize("small");
            }}
          />
          <SideItem navSize={navSize} icon={FiHome} title="Dashboard" active />
          <SideItem navSize={navSize} icon={FiDollarSign} title="Order"/>
          <SideItem navSize={navSize} icon={FiFolder} title="Warehouse" />
          <SideItem navSize={navSize} icon={FiShoppingCart} title="Product" />
          <SideItem navSize={navSize} icon={FiSmile} title="Users" />
        </Flex>

        <Flex p="5%" flexDir="column" w="100%" alignItems={navSize == "small" ? "center" : "flex-start"} mb={4}>
          <Divider display={navSize == "small" ? "none" : "flex"} />
          <Flex mt={4} align="center">
            <Avatar size="sm" src="avatar1.jpg" />
            <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
              <Heading as="h3" size="sm">
                Sri Mules
              </Heading>
              <Text color="gray" fontSize="xs">
                Admin
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Sidebar;
