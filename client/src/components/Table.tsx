import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from '@chakra-ui/react'

interface TableHeader {
    text: string,
    id: number
}

const tableHeader: TableHeader[] = [{ text: "To convert into", id: 1 }, { id: 2, text: "into" }, { id: 3, text: "multiply by" }]

const TableComponent = () => {
    return (
        <Table variant='striped' colorScheme='blue'>
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
                <Tr>
                    {tableHeader.map((header) => (
                        <Th >{header.text} </Th>
                    ))}

                </Tr>
            </Thead>
            <Tbody>
                <Tr cursor={'pointer'}>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td>25.4</Td>
                </Tr>
                <Tr>
                    <Td>feet</Td>
                    <Td>centimetres (cm)</Td>
                    <Td>30.48</Td>
                </Tr>
                <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td>0.91444</Td>
                </Tr>
            </Tbody>
            <Tfoot>
                <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th>multiply by</Th>
                </Tr>
            </Tfoot>
        </Table>
    )
}

export default TableComponent
