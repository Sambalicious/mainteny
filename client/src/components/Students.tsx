import axios from "axios"
import { useEffect, useState } from "react"
import Layout from "./Layout"
import Table from './Table'
import { StudentsProps, TableHeader } from "../types/index"
import { Button, Flex } from "@chakra-ui/react"


interface StudentProps {
    CurrentPage: number,
    TotalPages: number,
    TotalCount: number,
    Students: StudentsProps[]
}


const tableHeadings: TableHeader[] = [{ text: "Name", id: 1 }, { id: 2, text: "Email" }, { id: 3, text: "No of registered courses" }]
const Students = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({} as StudentProps)
    const [pageIndex, setPageIndex] = useState(1);

    const getStudents = async () => {
        setLoading(true);
        let response = await axios.get(`/api/students?pageIndex=${pageIndex}&pageSize=3`);
        setData(response.data.Data)
        setLoading(false);
    }
    useEffect(() => {
        getStudents()
    }, [pageIndex])



    return (

        <Layout>
            <Table tableHeadings={tableHeadings} tableBody={data.Students} loading={loading} />

            <Flex my={10} justify={'center'}><Button disabled={data.CurrentPage === 1} onClick={() => setPageIndex(pageIndex - 1)} colorScheme={'blue'}>Prev </Button> <Button disabled={data.CurrentPage === data.TotalPages} onClick={() => setPageIndex(pageIndex + 1)} ml={8} colorScheme={'blue'}>Next</Button> </Flex>
        </Layout>
    )
}

export default Students
