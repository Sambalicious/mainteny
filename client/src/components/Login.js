import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
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
import { useLocation, useNavigate, Link as ReactLink } from 'react-router-dom';
export default function SimpleCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname ?? '/students';

  const loginUser = async () => {
    setLoading(false);
    try {
      const data = {
        Email: email,
        Password: password,
      };

      let response = await axios.post('/api/login', data);
      setLoading(false);
      if (response) {
        let { AccessToken } = response.data.Data;
        localStorage.setItem('accessToken', AccessToken);
        navigate(from, { replace: true });
        return toast({
          title: 'Login Success',
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
          <Heading fontSize={'4xl'}>Sign in to the dashboard</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy full features
          </Text>
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
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>
              <Button
                onClick={loginUser}
                isLoading={loading}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Sign in
              </Button>
            </Stack>
            <Text>
              Don't have an Account?{' '}
              <Link as={ReactLink} to="/register" color={'#4299e1'}>
                {' '}
                Register
              </Link>{' '}
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
