import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link as ReactLink } from 'react-router-dom';
export default function SimpleCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const createUser = async () => {
    setLoading(false);
    try {
      const data = {
        Email: email,
        Password: password,
      };

      let response = await axios.post('/api/register', data);
      setLoading(false);
      if (response) {
        navigate({ pathname: `/` });
        return toast({
          title: 'Registration successful. Please Login',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
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
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign up to the dashboard</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </FormControl>
            <Stack mt={5} spacing={10}>
              <Button
                onClick={createUser}
                isLoading={loading}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Register
              </Button>
            </Stack>
            <Text>
              Already have an Account?{' '}
              <Link as={ReactLink} to="/" color={'#4299e1'}>
                {' '}
                Login
              </Link>{' '}
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
