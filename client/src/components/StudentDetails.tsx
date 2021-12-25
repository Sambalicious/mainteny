import { Box, VStack, Text, Button, Center, Spinner, HStack, SimpleGrid } from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CourseProps, StudentsProps } from "../types"
import { useToast } from '@chakra-ui/react'

interface ButtonIDProps {
    id: number | null
}

const StudentDetails = () => {

    const toast = useToast()

    const { id } = useParams();

    const [studentData, setStudentData] = useState({} as StudentsProps)
    const [coursesData, setCoursesData] = useState([] as CourseProps[])
    const [loading, setLoading] = useState(false)
    const [buttonLoadingId, setButtonLoadingId] = useState({} as ButtonIDProps)
    const fetchStudentData = async () => {
        // setLoading(true)
        let response = await axios.get(`/api/students/${id}`);
        setStudentData(response.data.Data)
        setLoading(false)
    }

    const getCourses = async () => {
        setLoading(true)
        let response = await axios.get('/api/courses');

        setCoursesData(response.data.Data?.Courses)
        setLoading(false)
    }

    useEffect(() => {
        fetchStudentData()
        getCourses()
    }, [])



    const addCourse = async (course: CourseProps) => {
        setButtonLoadingId({ id: course.id! });
        let data = {
            CourseId: course.id
        }

        let response = await axios.post(`/api/students/${id}`, data)

        console.log({ response: response.data })
        if (response.data.Status === "SUCCESS") {
            toast({
                title: 'Course Added.',
                description: "This Course has been added.",
                status: 'success',
                duration: 3000,
                isClosable: true,
                // position: "bottom-left"
            })

            fetchStudentData()
        }


        setButtonLoadingId({ id: null })

    }

    return (
        <Box p={4}>

            {loading ? (<Center>
                <Spinner />
            </Center>) : (
                <Box>
                    <VStack justify={"center"}>
                        <HStack>
                            <Text>Student Name: </Text>

                            <Text>{studentData.Name} </Text>
                        </HStack>
                        <HStack>
                            <Text>Student Email: </Text>
                            <Text>{studentData.Email} </Text>
                        </HStack>
                    </VStack>


                    <Text mt={8} mb={5} textAlign={'center'}>Registered course(s)</Text>


                    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                        {studentData.Courses?.length ? studentData.Courses.map((data) => (
                            <Box>
                                <HStack>
                                    <Text>Course Title: </Text>
                                    <Text>{data.Course} </Text>
                                </HStack>
                                <HStack>
                                    <Text> Lecturer Name:</Text>
                                    <Text>{data.Lecturer} </Text>
                                </HStack>
                            </Box>
                        )) : <Text >This student has no Registered course yet</Text>}
                    </SimpleGrid>


                    <Box mt={10}>


                        <Text mb={5} textAlign={'center'}>Available Courses</Text>
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>


                            {coursesData?.map((data) => (
                                <Box my={8} key={data.Course} >
                                    <HStack>
                                        <Text>Course Title: </Text>
                                        <Text>{data.Course} </Text>
                                    </HStack>
                                    <HStack>
                                        <Text> Lecturer Name:</Text>
                                        <Text>{data.Lecturer} </Text>
                                    </HStack>




                                    <Button isLoading={buttonLoadingId.id === data.id} mt={4} colorScheme={'blue'} onClick={() => addCourse(data)}>Add Course </Button>

                                </Box>
                            ))}
                        </SimpleGrid>
                    </Box>

                </Box>
            )
            }



        </Box >
    )
}

export default StudentDetails
