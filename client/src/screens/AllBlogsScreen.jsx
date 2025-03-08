import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Button,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { listBlogs } from '../actions/blogActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const AllBlogsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogList = useSelector((state) => state.blogList);
  const { loading, error, blogs } = blogList;

  useEffect(() => {
    dispatch(listBlogs());
  }, [dispatch]);

  const handleBlogClick = (id) => {
    navigate(`/blog/${id}`);
  };

  const headerBg = useColorModeValue('brandBlue.500', 'brandBlue.700');
  const blogCardBg = useColorModeValue('white', 'gray.800');
  const blogCardHoverBg = useColorModeValue('gray.100', 'gray.700');

  const formatImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/400x200';

    const normalizedPath = imagePath.replace(/\\/g, '/');

    if (normalizedPath.startsWith('/uploads')) {
      return `/api${normalizedPath}`; 
    }

    return normalizedPath;
  };

  return (
    <Box>
      {/* Header */}
      <Flex
        bg={headerBg}
        color="white"
        p={4}
        justifyContent="center"
        alignItems="center"
        boxShadow="md"
      >
        <Heading as="h1" size="xl">
          Blog
        </Heading>
      </Flex>

      {/* Blog List */}
      <Box p={4} maxW="1200px" mx="auto">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message type="error">{error}</Message>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {blogs.map((blog) => (
              <Box
                key={blog.id}
                bg={blogCardBg}
                borderRadius="lg"
                boxShadow="md"
                overflow="hidden"
                transition="all 0.2s"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: 'lg',
                  bg: blogCardHoverBg,
                }}
                cursor="pointer"
                onClick={() => handleBlogClick(blog.id)}
              >
                <Image
                  src={formatImageUrl(blog.image)} 
                  alt={blog.title}
                  h="200px"
                  w="100%"
                  objectFit="cover"
                />
                <Box p={4}>
                  <Text fontSize="sm" color="gray.500" mb={2}>
                    By {blog.author} | {new Date(blog.created_at).toLocaleDateString()}
                  </Text>
                  <Heading as="h2" size="md" mb={2} color="brandBlue.500">
                    {blog.title}
                  </Heading>
                  <Text noOfLines={3} color="gray.700">
                    {blog.article}
                  </Text>
                  <Button
                    mt={4}
                    colorScheme="brandRed"
                    size="sm"
                    onClick={() => handleBlogClick(blog.id)}
                  >
                    Read More
                  </Button>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default AllBlogsScreen;