import { Box, VStack, Text, Button, Center, Spinner, HStack, SimpleGrid } from "@chakra-ui/react"
import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { CourseProps, ResponseError, StudentsProps } from "../types"
import { useToast } from '@chakra-ui/react'

interface ButtonIDProps {
    id: number | null
}

interface IData {
    Data: object
}

const StudentDetails = () => {
    const toast = useToast()
    const { id } = useParams();
    const [studentData, setStudentData] = useState({} as StudentsProps)
    const [coursesData, setCoursesData] = useState([] as CourseProps[])
    const [loading, setLoading] = useState(false)
    const [buttonLoadingId, setButtonLoadingId] = useState({} as ButtonIDProps)

    const fetchStudentData = async () => {
        setLoading(true)


        try {
            let response = await axios.get(`/api/students/${id}`);

            setStudentData(response.data.Data)



            let { Data } = response.data
            console.log(Data)
        } catch (error) {
            return toast({
                title: 'Course Added.',
                description: "This Course has been added.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            })

            //  console.log(error.message)
        }



        setLoading(false)
    }

    const getCourses = async () => {

        setLoading(true)



        const config: AxiosRequestConfig = {
            method: "get",
            url: '/api/courses',

            headers: {
                "Content-Type": "application/json",
            },

        }


        try {
            let response = await axios(config);
            console.log(response);


            setCoursesData(response.data.Data?.Courses)




        } catch (error) {

            let err = error as Error;
            console.log(err.message)
            console.log(err.response)
            if (error instanceof ResponseError) {
                console.log(error.message)
            }


            return toast({
                title: (error as Error).message,
                description: "Someting went wrong on here",
                status: 'error',
                duration: 3000,
                isClosable: true,
                // position: "bottom-left"
            })
            // console.log(error.message)
        }

        setLoading(false)
    }

    useEffect(() => {
        fetchStudentData()
        getCourses()
    }, [])



    const addCourse = async (course: CourseProps) => {
        setButtonLoadingId({ id: course.id! });

        try {
            let data = {
                CourseId: course.id
            }

            let response = await axios.post(`/api/students/${id}`, data)

            console.log({ response: response.data })

            toast({
                title: 'Course Added.',
                description: "This Course has been added.",
                status: 'success',
                duration: 3000,
                isClosable: true,
                // position: "bottom-left"
            })

            fetchStudentData()



        } catch (error) {
            console.log(error)
        }


        setButtonLoadingId({ id: null })

    }

    return (
        <Box p={4}>

            {loading ? (<Center minH={'100vh'}>
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
                            <Box key={data.id}>
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


                        <Text mb={3} textAlign={'center'}>Available Courses(s)</Text>
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>


                            {coursesData?.map((data) => (
                                <Box my={8} key={data.id} >
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
