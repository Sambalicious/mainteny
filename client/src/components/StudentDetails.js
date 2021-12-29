import {
  Box,
  VStack,
  Text,
  Button,
  Center,
  Spinner,
  HStack,
  SimpleGrid,
} from '@chakra-ui/react';
import axios from '../utils/axiosInstance';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useToast } from '@chakra-ui/react';
import axiosInstance from '../utils/axiosInstance';

const StudentDetails = () => {
  const toast = useToast();
  const { id } = useParams();
  const [studentData, setStudentData] = useState({});
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonLoadingId, setButtonLoadingId] = useState({});

  const fetchStudentData = async () => {
    setLoading(true);

    try {
      let response = await axiosInstance(`/api/students/${id}`);

      setStudentData(response.data.Data);
    } catch (error) {
      return toast({
        title: error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    setLoading(false);
  };

  const getCourses = async () => {
    setLoading(true);

    try {
      let response = await axiosInstance('/api/courses');

      setCoursesData(response.data.Data?.Courses);
    } catch (error) {
      return toast({
        title: error.response.data.message,
        //  description: 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchStudentData();
    getCourses();

    //eslint-disable-next-line
  }, []);

  const addCourse = async (course) => {
    setButtonLoadingId({ id: course.id });

    try {
      let data = {
        CourseId: course.id,
      };

      let response = await axios.post(`/api/students/${id}`, data);

      if (response) {
        toast({
          title: 'Course Added.',
          description: 'This Course has been added.',
          status: 'success',
          duration: 3000,
          isClosable: true,
          // position: "bottom-left"
        });

        fetchStudentData();
      }
    } catch (error) {
      console.log(error);
    }

    setButtonLoadingId({ id: null });
  };

  return (
    <Box p={4}>
      {loading ? (
        <Center minH={'100vh'}>
          <Spinner />
        </Center>
      ) : (
        <Box>
          <VStack justify={'center'}>
            <HStack>
              <Text>Student Name: </Text>

              <Text>{studentData.Name} </Text>
            </HStack>
            <HStack>
              <Text>Student Email: </Text>
              <Text>{studentData.Email} </Text>
            </HStack>
          </VStack>

          <Text mt={8} mb={5} textAlign={'center'}>
            Registered course(s)
          </Text>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            {studentData.Courses?.length ? (
              studentData.Courses.map((data) => (
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
              ))
            ) : (
              <Text>This student has no Registered course yet</Text>
            )}
          </SimpleGrid>

          <Box mt={10}>
            <Text mb={3} textAlign={'center'}>
              Available Courses(s)
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              {coursesData?.length > 0 ? (
                coursesData?.map((data) => (
                  <Box my={8} key={data.id}>
                    <HStack>
                      <Text>Course Title: </Text>
                      <Text>{data.Course} </Text>
                    </HStack>
                    <HStack>
                      <Text> Lecturer Name:</Text>
                      <Text>{data.Lecturer} </Text>
                    </HStack>

                    <Button
                      isLoading={buttonLoadingId.id === data.id}
                      mt={4}
                      colorScheme={'blue'}
                      onClick={() => addCourse(data)}
                    >
                      Add Course{' '}
                    </Button>
                  </Box>
                ))
              ) : (
                <Text>
                  There are no available courses yet. Please create some.
                </Text>
              )}
            </SimpleGrid>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default StudentDetails;
