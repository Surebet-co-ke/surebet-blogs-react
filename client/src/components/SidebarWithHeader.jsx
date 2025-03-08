import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  Image,
  HStack,
  VStack,
  Icon,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useMediaQuery,
} from '@chakra-ui/react';
import {
  FiMenu,
  FiChevronDown,
} from 'react-icons/fi';
import { IoHome, IoNewspaperSharp } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUsers, FaListCheck } from "react-icons/fa6";
import { Link as RouterLink, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { logout } from '../actions/userActions';


const SubLink = ({ to, children, onClose }) => {
  const handleClick = () => {
    onClose();
  };

  return (
    <NavLink to={to} style={{ textDecoration: 'none' }}>
      <MenuItem onClick={handleClick}>{children}</MenuItem>
    </NavLink>
  );
};


const adminLinkItems = [
  { name: 'Home', icon: MdAdminPanelSettings, to: '/admin-home' },
  { name: 'Blogs', icon: IoNewspaperSharp, to: '/blogs' },
  { name: 'Manage', icon: FaListCheck, to: '/bloglist' },
  { name: 'Users', icon: FaUsers, to: '/admin-users' },
];

const userLinkItems = [
  { name: 'Home', icon: IoHome, to: '/blogs' },
];

const defaultLinkItems = userLinkItems;

const SidebarContent = ({ onClose }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  let updatedLinkItems;

  if (userInfo && userInfo.role === 'admin') {
    updatedLinkItems = adminLinkItems;
  } else if (userInfo && userInfo.role === 'user') {
    updatedLinkItems = userLinkItems;
  } else {
    updatedLinkItems = defaultLinkItems;
  }

  return (
    <Box
      transition="3s ease"
      bg="white"
      borderRight="1px"
      borderRightColor="brandRed"
      w={{ base: 80, md: 60 }}
      pos="fixed"
      h="full"
    >
      <Flex h="16" alignItems="center" mx="8" justifyContent="space-between">
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
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} color="brandBlue" />
      </Flex>
      {updatedLinkItems.map((link) => (
        <Box borderRadius="lg" role="group" cursor="pointer" key={link.name}>
          {link.subLinks ? (
            <Menu key={link.name}>
              <MenuButton
                mr="8"
                as={Text}
                h="14"
                color="black"
                ml="6"
                display="flex"
                alignItems="center"
                _hover={{ color: 'brandBlue' }}
              >
                <Icon
                  mr="4"
                  fontSize="16"
                  as={link.icon}
                  ml={2}
                  color="black"
                  _groupHover={{ color: 'brandBlue' }}
                />
                {link.name}
              </MenuButton>
              <MenuList as={Box} bg="brandBlue" border="none" color="white">
                {link.subLinks.map((subLink) => (
                  <SubLink key={subLink.name} to={subLink.to} onClose={onClose}>
                    <Text
                      px="4"
                      py="2"
                      color="brandBlue"
                      _hover={{
                        bg: 'brandBlue',
                        color: 'white',
                        borderRadius: 'lg',
                      }}
                    >
                      {subLink.name}
                    </Text>
                  </SubLink>
                ))}
              </MenuList>
            </Menu>
          ) : (
            <NavItem icon={link.icon} color="black" onClose={onClose}>
              <RouterLink to={link.to} style={{ textDecoration: 'none' }}>
                {link.name}
              </RouterLink>
            </NavItem>
          )}
        </Box>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, onClose, ...rest }) => {

  const handleClick = () => {
    onClose();
  };

  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'brandGrey',
          color: 'black',
        }}
        {...rest}
        onClick={handleClick}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'brandBlue',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobile] = useMediaQuery('(max-width: 48em)');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  if (!userInfo) {
    return null;
  }

  const truncateText = (text, length) => {
    return text.length > length ? `${text.slice(0, length)}...` : text;
  };

  return (
    <Flex
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg="white"
      borderBottomWidth="1px"
      borderBottomColor="brandRed"
      color="black"
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        bg="white"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Flex alignItems="center" mx="8" justifyContent="space-between">
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
      </Flex>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          {userInfo ? (
            <Menu>
              <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }} mr={4}>
                <HStack>
                  <Avatar
                    size={'sm'}
                    src={userInfo?.icon ? userInfo?.icon :
                      'https://media.istockphoto.com/id/914576586/photo/stand-out-from-the-crowd-and-different-concept-one-glowing-light-man-raising-his-hand-among.webp?a=1&b=1&s=612x612&w=0&k=20&c=wdTVK39bjlddEbaMomn_eJqS5wY_vcZUdf38keP3Avk='
                    }
                  />
                  <VStack display="flex" alignItems="flex-start" spacing="1px" ml="2">
                    {userInfo && (
                      <>
                        <Text fontSize="sm">
                          {isMobile ? truncateText(userInfo.name, 5) : userInfo.name}
                        </Text>
                        <Text fontSize="xs" color="black">
                          Welcome ✨
                        </Text>
                      </>
                    )}
                  </VStack>;
                  <Box display='flex'>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList bg="brandRed" color="black" borderColor="brandRed">
                <MenuItem>
                  <NavLink to="/profile" style={{ textDecoration: 'none' }}>
                    Profile
                  </NavLink>
                </MenuItem>
                <MenuDivider />
                {userInfo.role === 'admin' && (
                  <>
                    <MenuItem>
                      <NavLink to="/userlist" style={{ textDecoration: 'none' }}>
                        Manage Users
                      </NavLink>
                    </MenuItem>
                    <MenuDivider />
                  </>
                )}
                <MenuItem>
                  <NavLink onClick={logoutHandler} style={{ textDecoration: 'none' }}>
                    Logout
                  </NavLink>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Text color="white">Not logged in</Text>
          )}
        </Flex>
      </HStack>
    </Flex>
  );
};

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile] = useMediaQuery('(max-width: 48em)');

  return (
    <Box bg="brandBlue">
      {!isMobile && <SidebarContent onClose={onClose} />}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        w="50%"
      >
        <DrawerContent bg="brandBlue">
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
    </Box>
  );
};

export default SidebarWithHeader;
