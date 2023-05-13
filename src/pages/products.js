import { RenderProducts, AddProductForm, AddStockForm } from "@/components/dataComponents/products";
import { HStack } from "@chakra-ui/react";

const Products = () => {

    return(
        <>
        <HStack>
         <AddStockForm/>
         <AddProductForm/>
        </HStack>
        
        <RenderProducts/>
        </>
    )
}

export default Products;