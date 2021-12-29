import { useEffect, useState } from 'react';
import Layout from './Layout';
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
  Box,
  Text,
} from '@chakra-ui/react';
import { Button, Flex, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const tableHeadings = [
  { text: 'Name', id: 1 },
  { id: 2, text: 'Email' },
  { id: 3, text: 'No of registered courses' },
];
const Students = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [pageIndex, setPageIndex] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const getStudents = async () => {
    setLoading(true);
    try {
      let response = await axiosInstance.get(
        `/api/students?pageIndex=${pageIndex}&pageSize=3`
      );
      setData(response.data.Data);
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

  useEffect(() => {
    getStudents();

    //eslint-disable-next-line
  }, [pageIndex]);

  const createStudent = async () => {
    setLoading(true);
    try {
      const data = {
        Name: name,
        Email: email,
        Password: password,
      };

      let response = await axiosInstance.post('/api/students', data);
      if (response) {
        setLoading(false);
        onClose();
        getStudents();
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
  };

  return (
    <Layout>
      <Flex justify={'flex-end'} align="center">
        {' '}
        <Button onClick={onOpen} my={5} colorScheme={'blue'}>
          Create new student{' '}
        </Button>
      </Flex>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create new student</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter student's Name"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Email</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter student's email"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*****"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                isLoading={loading}
                disable={loading}
                onClick={createStudent}
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

      {data?.Students?.length > 0 ? (
        <Box>
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
              {data?.Students?.map((data) => (
                <Tr
                  onClick={() =>
                    navigate({ pathname: `/students/${data.UserId}` })
                  }
                  key={data.Email}
                  cursor={'pointer'}
                >
                  <Td>{data.Name}</Td>
                  <Td>{data.Email}</Td>
                  <Td isNumeric>{data.Courses?.length ?? 0} </Td>
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

          <Flex my={10} justify={'center'}>
            <Button
              disabled={data.CurrentPage === 1}
              onClick={() => setPageIndex(pageIndex - 1)}
              colorScheme={'blue'}
            >
              Prev{' '}
            </Button>{' '}
            <Button
              disabled={data.CurrentPage === data.TotalPages}
              onClick={() => setPageIndex(pageIndex + 1)}
              ml={8}
              colorScheme={'blue'}
            >
              Next
            </Button>{' '}
          </Flex>
        </Box>
      ) : (
        <Text textAlign={'center'} my={10}>
          No student data yet. Please create a student
        </Text>
      )}
    </Layout>
  );
};

export default Students;
