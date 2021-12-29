
import { Box } from '@chakra-ui/react'

import Sidebar from './Sidebar'
const Layout= ({ children }) => {
    return (
        <Sidebar>
            <Box>{children} </Box>
        </Sidebar>



    )
}

export default Layout
