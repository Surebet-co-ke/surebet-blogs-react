import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Link,
	Spacer,
	Text,	
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Link as RouterLink,
	useNavigate,
	useSearchParams,
} from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';

const LoginScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [searchParam] = useSearchParams();
	let redirect = searchParam.get('redirect') || '/blogs';

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            const role = userInfo.role;

            if (role === 'user') {
                navigate('/blogs');
            } else if (role === 'admin') {
                navigate('/admin-home');
            }
        }
    }, [navigate, userInfo, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	return (
		<Flex
			w={{ base: '80%', md: '60%' }}
			alignItems='center'
			justifyContent='center'
			py='5'
			mx='auto'
			flexDir='column'
		>
			<FormContainer>
				<Flex justify="space-between" mb="4">					
					<Heading as='h4' mb='8' fontSize='xl' color ='brandBlue' display='flex'>
						Login
					</Heading>
					<Button as={RouterLink} to="/" colorScheme="gray" mb={4} color='brandBlue' leftIcon={<FaHome />}>
						Back
					</Button>
				</Flex>

				{error && <Message type='error'>{error}</Message>}

				<form onSubmit={submitHandler}>
					<FormControl id='email'>
						<FormLabel htmlFor='email'>Email address</FormLabel>
						<Input
							id='email'
							type='email'
							placeholder='username@domain.com'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormControl>

					<Spacer h='3' />

					<FormControl id='password'>
						<FormLabel htmlFor='password'>Password</FormLabel>
						<Input
							id='password'
							type='password'
							placeholder='************'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</FormControl>

					<Button type='submit' bg='brandBlue' color='white' _hover={{ bg: 'brandOtherBlue' }} mt='4' isLoading={loading}>
						Login
					</Button>
				</form>

				<Flex pt='10'>
					<Text fontWeight='semibold'>
						New User?{' '}
						<Link as={RouterLink} to='/register'>
							Click here to register
						</Link>
					</Text>
				</Flex>
			</FormContainer>
		</Flex>
	);
};

export default LoginScreen;
