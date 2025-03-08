import { Flex, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex
      as='footer'
      justifyContent='center'
      alignItems='center'
      py='2'
      flexDirection='column'
      textAlign='center'
      fontFamily="'Lato', sans-serif"
      bg="white"
    >

      {/* Copyright Text */}
      <Text mt='3' fontWeight='semibold' color="brandBlue">
          &copy; {new Date().getFullYear()}{'    '} 
          <Text
            display='flex'
            mr={{ base: '100', md: '150' }}
            fontSize="2xl"
            fontFamily="monospace"
            fontWeight="bold"
            color="brandRed"
          >
            Sure
            <Text
                as='span'
                fontSize="xl"
                align="left"
                color="brandBlue"
              >
              Bet
            </Text>
          </Text>    
      </Text>

    </Flex>
  );
};

export default Footer;