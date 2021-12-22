
import { Box } from '@chakra-ui/react'
import { FC } from 'react'
import { ComponentWithChildProps } from '../types'
import Sidebar from './Sidebar'
const Layout: FC = ({ children }: ComponentWithChildProps) => {
    return (

        <Sidebar>
            <Box>{children} </Box>

        </Sidebar>



    )
}

export default Layout
