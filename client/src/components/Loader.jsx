import { Flex, Spinner } from '@chakra-ui/react';

const Loader = () => {
	return (
		<Flex alignItems='center' justifyContent='center'>
			<Spinner
				thickness='4px'
				speed='0.65s'
				emptyColor='gray.200'
				color='brandBlue'
				size='xl'
			/>
		</Flex>
	);
};

export default Loader;
