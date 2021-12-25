import axios from "axios"
import { useEffect, useState } from "react"
import { CourseProps, CoursesProps, TableHeader } from "../types"
import Layout from "./Layout"
import Table from "./Table"


const tableHeadings: TableHeader[] = [{ text: "Course Title", id: 1 }, { id: 2, text: "Lecturer" }, { id: 3, text: "No of Enrolled students" }]




const Courses = () => {

    const [data, setData] = useState({} as CoursesProps)
    const getCourses = async () => {
        let response = await axios.get('/api/courses')

        setData(response.data.Data)
    }


    console.log({ data })

    useEffect(() => {
        getCourses()
    }, [])
    return (
        <Layout>
            {/* <Table tableHeadings={tableHeadings} tableBody={data} loading /> */}
        </Layout>
    )
}

export default Courses
