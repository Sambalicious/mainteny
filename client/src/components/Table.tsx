import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Spinner,
    Center,
    Flex,
    Button,
    Box

} from '@chakra-ui/react'

import { TableHeader, CourseProps, StudentsProps } from '../types/index'

import { useNavigate } from 'react-router-dom'

interface TableComponent<T> {
    tableHeadings: TableHeader[],
    tableBody?: T[],
    loading: boolean

}

const TableComponent = ({ tableBody, tableHeadings, loading }: TableComponent<StudentsProps>) => {
    const navigate = useNavigate()

    return (

        <Table variant='striped' colorScheme='blue'>
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead>
                <Tr>
                    {tableHeadings.map((header) => (
                        <Th isNumeric={header.id === 3} key={header.id} >{header.text} </Th>
                    ))}

                </Tr>
            </Thead>


            <Tbody>
                {
                    tableBody?.map((data) => (


                        <Tr onClick={() => navigate({ pathname: `/students/${data.UserId}` })} key={data.Email} cursor={'pointer'}>
                            <Td>{data.Name}</Td>
                            <Td>{data.Email}</Td>
                            <Td isNumeric>{data.Courses?.length ?? 0} </Td>
                        </Tr>

                    ))}

            </Tbody>


            <Tfoot>
                <Tr>
                    {tableHeadings.map((header) => (
                        <Th isNumeric={header.id === 3} key={header.id} >{header.text} </Th>
                    ))}

                </Tr>
            </Tfoot>

        </Table>
    )
}

export default TableComponent
