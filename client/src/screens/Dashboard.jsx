import React, { useEffect } from 'react';
import { Box, Flex, Text, Icon, } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaRegNewspaper } from "react-icons/fa6";

import { listBlogs } from '../actions/blogActions';
import { listUsers } from '../actions/userActions';


const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listBlogs());
      dispatch(listUsers());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo]);

  const blogList = useSelector((state) => state.blogList);
  const { blogs } = blogList;

  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  return (
    <>
      <Box p="4" bg="white" borderRadius="lg" boxShadow="md" m={2} width='100%'>
        {/* Header */}
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Text fontSize="xl" fontWeight="bold">
            Welcome 
          </Text>
        </Flex>
        <Flex flexWrap="wrap" justify="space-around">
          {/* Blogs*/}
          <Box
            width={{ base: '70%', md: '40%' }}
            h="60px"
            m={4}
            border="2px solid white"
            bg=' gray.50'
            borderRadius="lg"
            boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
            transition="all 0.2s ease-in-out"
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
            }}
          >
            <Flex>
              <Icon as={FaRegNewspaper} m={2} fontSize="3xl" color="brandOtherBlue" />
              <Text fontSize="xl" alignSelf="center" m={2} fontWeight="semibold" color='primary.800'>
                Blogs
              </Text>
              <Text m={2} fontSize="lg" alignSelf="center" color=" gray.700">
                {blogs && blogs.length}
              </Text>
            </Flex>
          </Box>


          {/* Users */}
          <Box
            width={{ base: '70%', md: '40%' }}
            h="60px"
            m={4}
            border="2px solid white"
            bg=' gray.50'
            borderRadius="lg"
            boxShadow="0 0 10px rgba(0, 0, 0, 0.1)"
            transition="all 0.2s ease-in-out"
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
            }}
          >
            <Flex>
              <Icon as={FaUsers} m={2} fontSize="3xl" color="brandOtherBlue" />
              <Text fontSize="xl" alignSelf="center" m={2} fontWeight="semibold" color='primary.800'>
                Users
              </Text>
              <Text m={2} fontSize="lg" alignSelf="center" color=" gray.700">
                {users && users.length}
              </Text>
            </Flex>
          </Box>

        </Flex>
        {/* <Image src="/api/uploads/image-1726661504734-287374087.webp" alt="Test Image" /> */}
      </Box>
    </>
  );
};

export default Dashboard;