import React, { useState } from 'react';
import {
  Box,
  Flex,
  Image,
  Link,
  IconButton,
  Stack,
  Button,
} from '@chakra-ui/react';
import { HiMenu } from 'react-icons/hi';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

import logoImage from '../images/logo.png';

const MenuItems = ({ to, children, onClick }) => (
  <RouterLink to={to} style={{ textDecoration: 'none' }}>
    <Button
      variant="link"
      mt={[4, 4, 0, 0]}
      mr={'36px'}
      display="block"
      fontWeight="medium"
      fontSize="md"
      color="white" // Changed to white for better visibility on brandBlue background
      _hover={{
        color: 'brandPurple',
        textDecoration: 'none',
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  </RouterLink>
);

const LandingHeader = () => {
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  return (
    <Box bg="brandBlue" color="white" py={2}>
      {/* Top Bar */}
      <Flex
        maxW="1200px"
        mx="auto"
        px={4}
        justify="space-between"
        align="center"
        display={{ base: 'none', md: 'flex' }}
      >
        {/* Social Media Links */}
        <Flex align="center">
          <Link href="https://surebet.co.ke" isExternal mx={2}>
            <FaFacebook size={20} />
          </Link>
          <Link href="https://surebet.co.ke" isExternal mx={2}>
            <FaTwitter size={20} />
          </Link>
          <Link href="https://surebet.co.ke" isExternal mx={2}>
            <FaLinkedin size={20} />
          </Link>
          <Link href="https://surebet.co.ke" isExternal mx={2}>
            <FaInstagram size={20} />
          </Link>
          <Link href="https://surebet.co.ke" isExternal mx={2}>
            <FaYoutube size={20} />
          </Link>
        </Flex>
      </Flex>

      {/* Main Header */}
      <Box bg="brandBlue.600" py={4}>
        <Flex
          maxW="1200px"
          mx="auto"
          px={4}
          justify="space-between"
          align="center"
        >
          {/* Logo */}
          <Link as={RouterLink} to="/">
            <Image src={logoImage} alt="Logo" w="150px" />
          </Link>

          {/* Navigation Links (Desktop) */}
          <Flex align="center" display={{ base: 'none', md: 'flex' }}>
            <MenuItems to="/">Home</MenuItems>
            <MenuItems to="/">Sport</MenuItems>
            <MenuItems to="/">News</MenuItems>
            <MenuItems to="/">Play Now</MenuItems>
            <MenuItems to="/">How To</MenuItems>
          </Flex>

          {/* Mobile Menu Toggle */}
          <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
            <HiMenu color="white" size={24} />
          </Box>
        </Flex>

        {/* Mobile Navigation Menu */}
        <Box
          display={{ base: show ? 'block' : 'none', md: 'none' }}
          width="full"
          textAlign="center"
          bg="brandBlue.600"
          pb={4}
        >
          <Stack spacing={4} m={4}>
            <MenuItems to="/" onClick={handleToggle}>
              Home
            </MenuItems>
            <MenuItems to="/" onClick={handleToggle}>
              Sport
            </MenuItems>
            <MenuItems to="/" onClick={handleToggle}>
              News
            </MenuItems>
            <MenuItems to="/" onClick={handleToggle}>
              Play Now
            </MenuItems>
            <MenuItems to="/" onClick={handleToggle}>
              How To
            </MenuItems>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingHeader;