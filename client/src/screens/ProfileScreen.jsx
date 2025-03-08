import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Text,
	Input,
	Spacer,	
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getUserDetails, updateUserProfile } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import { USER_DETAILS_RESET } from '../constants/userConstants';

const ProfileScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userId = userInfo ? userInfo.id : '';

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;


	useEffect(() => {
		if (!userInfo) {
			navigate('/login');
		} else {
			if (!user || !user.name) {
				dispatch(getUserDetails(userId));
			} else {
				setName(user.name);
				setEmail(user.email);
				setPhone(user.phone);
			}
		}
	}, [dispatch, navigate, user, userInfo, userId, success]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			dispatch(updateUserProfile({ id: user.id, name, email, phone, password }))
			.then(() => {
				dispatch(getUserDetails(userId))
			  });
			dispatch({ type: USER_DETAILS_RESET });
		}
	};

	return (
		<Box p="4" bg="white" borderRadius="lg" boxShadow="md" m={4} width="100%">  
			<Flex w='full' alignItems='center' justifyContent='center' py='5'>
				<FormContainer>
					<Text fontSize="xl" fontWeight="bold" m={8} color="brandBlue">``
						User Profile
					</Text>

					{error && <Message type='error'>{error}</Message>}
					{message && <Message type='error'>{message}</Message>}

					<form onSubmit={submitHandler}>
						<FormControl id='name'>
							<FormLabel htmlFor='name'>Your Name</FormLabel>
							<Input
								id='name'
								type='text'
								placeholder='Your full name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</FormControl>

						<Spacer h='3' />

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

						<FormControl id='phone'>
							<FormLabel htmlFor='email'>Phone</FormLabel>
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

						<Button type='submit' bg="brandBlue" color= "white" _hover={{ bg: 'brandOtherBlue' }} mt='4' isLoading={loading}>
							Update
						</Button>
					</form>
				</FormContainer>
			</Flex>			
		</Box>
	);
};

export default ProfileScreen;
