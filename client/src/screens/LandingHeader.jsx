import React, { useState } from 'react';
import {
  Box,
  Flex,
  Image,
  Link,
  Stack,
  Button,
} from '@chakra-ui/react';
import { HiMenu } from 'react-icons/hi';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

import logoImage from '../images/logo.png';

const MenuItems = ({ to, children, onClick, isExternal = false }) => {
  return isExternal ? (
    <Link
      href={to}
      isExternal
      style={{ textDecoration: 'none' }}
      _hover={{ textDecoration: 'none' }}
    >
      <Button
        variant="link"
        mt={[4, 4, 0, 0]}
        mr={'36px'}
        display="block"
        fontWeight="medium"
        fontSize="md"
        color="white"
        _hover={{
          color: 'brandPurple',
          textDecoration: 'none',
        }}
        onClick={onClick}
      >
        {children}
      </Button>
    </Link>
  ) : (
    <RouterLink to={to} style={{ textDecoration: 'none' }}>
      <Button
        variant="link"
        mt={[4, 4, 0, 0]}
        mr={'36px'}
        display="block"
        fontWeight="medium"
        fontSize="md"
        color="white"
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
};

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
          <Link href="https://www.facebook.com/kesurebet" isExternal mx={2}>
            <FaFacebook size={20} />
          </Link>
          <Link href="https://x.com/Kenya_Surebet" isExternal mx={2}>
            <FaTwitter size={20} />
          </Link>
          <Link href="https://www.linkedin.com/company/surebet-ke-official" isExternal mx={2}>
            <FaLinkedin size={20} />
          </Link>
          <Link href="https://www.instagram.com/surebet_kenya_official" isExternal mx={2}>
            <FaInstagram size={20} />
          </Link>
          <Link href="https://wa.me/254724599488" isExternal mx={2}>
            <FaWhatsapp size={20} />
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
            <MenuItems to="https://surebet.co.ke" isExternal>Play Now</MenuItems>
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
            <MenuItems to="https://surebet.co.ke" isExternal onClick={handleToggle}>
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