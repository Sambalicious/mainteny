import { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { Button, Flex, useToast } from '@chakra-ui/react';
import Layout from './Layout';
import axiosInstance from '../utils/axios';

const tableHeadings = [
  { text: 'Course Title', id: 1 },
  { id: 2, text: 'Lecturer' },
  { id: 3, text: 'No of Enrolled students' },
];

const Courses = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [courseTitle, setCourseTitle] = useState('');
  const [lecturerName, setLecturerName] = useState('');
  const [data, setData] = useState({});

  const getCourses = async () => {
    setLoading(false);
    try {
      let response = await axiosInstance.get('/api/courses');
      setData(response?.data?.Data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return toast({
        title: error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const createCourse = async () => {
    setLoading(true);
    try {
      const data = {
        Course: courseTitle,
        Lecturer: lecturerName,
      };
      let response = await axiosInstance.post('/api/courses', data);

      if (response) {
        setLoading(false);
        getCourses();
        onClose();
      }
    } catch (error) {
      setLoading(false);
      return toast({
        title: error.response.data.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    getCourses();

    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <Flex justify={'flex-end'}>
        {' '}
        <Button onClick={onOpen} my={5} colorScheme={'blue'}>
          Add new course{' '}
        </Button>
      </Flex>

      {isOpen && (
        <Modal
          // initialFocusRef={initialRef}
          // finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create new course</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Course</FormLabel>
                <Input
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="Course title"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Lecturer</FormLabel>
                <Input
                  value={lecturerName}
                  onChange={(e) => setLecturerName(e.target.value)}
                  placeholder="Lecturer's Name"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                isLoading={loading}
                onClick={createCourse}
                colorScheme="blue"
                mr={3}
              >
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      <Table variant="striped" colorScheme="blue">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            {tableHeadings.map((header) => (
              <Th isNumeric={header.id === 3} key={header.id}>
                {header.text}{' '}
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {data?.Courses?.map((data) => (
            <Tr key={data.Course}>
              <Td>{data.Course}</Td>
              <Td>{data.Lecturer}</Td>
              <Td isNumeric>{data?.Students?.length} </Td>
            </Tr>
          ))}
        </Tbody>

        <Tfoot>
          <Tr>
            {tableHeadings.map((header) => (
              <Th isNumeric={header.id === 3} key={header.id}>
                {header.text}{' '}
              </Th>
            ))}
          </Tr>
        </Tfoot>
      </Table>
    </Layout>
  );
};

export default Courses;
