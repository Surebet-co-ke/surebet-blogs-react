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
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Link as RouterLink,
	useNavigate,
	useSearchParams,
} from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';

const RegisterScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	let [searchParams] = useSearchParams();
	let redirect = searchParams.get('redirect') || '/blogs';
	
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const userRegister = useSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [navigate, userInfo, redirect]);
	  
	const submitHandler = async (e) => {
		e.preventDefault();
	  
		if (password !== confirmPassword) {
		  setMessage('Passwords do not match');
		} else {
		  try {
			dispatch(
			  register(
				name,
				email,
				phone,
				password,
			  )
			);
			navigate('/blogs');
		  } catch (error) {
			setMessage('Registration failed. Please try again.');
			console.error('Registration Error:', error);
		  }
		}
	  };
	  

	return (
		<Flex 
            w={{ base: "80%", md: "60%" }} alignItems='center' justifyContent='center' py='5' mx='auto'>
			
			<FormContainer>
				<Flex justify="space-between" mb="4">					
					<Heading as='h4' mb='8' fontSize='xl' color ='brandBlue' display='flex'>
						Register
					</Heading>
					<Button as={RouterLink} to="/" colorScheme="gray" mb={4} color='brandBlue' leftIcon={<FaHome />}>
						Back
					</Button>
				</Flex>

				{error && <Message type='error'>{error}</Message>}
				{message && <Message type='error'>{message}</Message>}

				<form onSubmit={submitHandler}>
					<FormControl id='name'>
						<FormLabel htmlFor='name'>Name</FormLabel>
						<Input
							id='name'
							type='text'
							placeholder='your name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</FormControl>

					<Spacer h='3' />

					<FormControl id='email'>
						<FormLabel htmlFor='email'>Email</FormLabel>
						<Input
							id='email'
							type='email'
							placeholder='username@domain.com'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</FormControl>

					<Spacer h='3' />

                    <FormControl id='phone'>
						<FormLabel htmlFor='phone'>Phone</FormLabel>
						<Input
							id='phone'
							type='number'
							placeholder='0XXX XXXXXX'
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
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

					<Spacer h='3' />

					<FormControl id='confirmPassword'>
						<FormLabel htmlFor='confirmPassword'>Confirm Password</FormLabel>
						<Input
							id='confirmPassword'
							type='password'
							placeholder='************'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</FormControl>					
	
					<Spacer h='3' />

					<Button type='submit' bg="brandBlue" color= "white" _hover={{ bg: 'brandOtherBlue' }} mt='4' isLoading={loading}>
						Register
					</Button>
				</form>

				<Flex pt='10'>
					<Text fontWeight='semibold'>
						Already Registered?{' '}
						<Link as={RouterLink} to='/login'>
							Click here to login
						</Link>
					</Text>
				</Flex>
			</FormContainer>
		</Flex>
	);
};

export default RegisterScreen;