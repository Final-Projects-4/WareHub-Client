import Expenses from "@/components/dataComponents/expenses"
import Revenues
 from "@/components/dataComponents/revenues"
import { HStack , VStack} from "@chakra-ui/react"
const Finance = () => {



    return(
        <>
        <VStack>
            <Expenses/>
            <Revenues/>
        </VStack>
        
        </>
    )

}

export default Finance