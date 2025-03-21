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
  Badge,
} from '@chakra-ui/react';

import { listBlogs } from '../actions/blogActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import LandingHeader from './LandingHeader';
import Footer from '../components/Footer';

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

  const headerBg = useColorModeValue('brandBlue', 'brandBlue.700');
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
      <LandingHeader />
      {/* Blog List */}
      <Box p={4} maxW="1200px" mx="auto">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message type="error">{error}</Message>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mx="auto" mt={4}>
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
                  {/* Display Categories as Badges */}
                  {blog.categories && blog.categories.length > 0 && (
                    <Flex mb={2} wrap="wrap" gap={2}>
                      {blog.categories.map((category) => (
                        <Badge
                          key={category.id}
                          bg="brandBlue"
                          color="white"
                          px={2}
                          py={1}
                          borderRadius="md"
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </Flex>
                  )}

                  <Heading as="h2" size="md" mb={2} color="brandBlue">
                    {blog.title}
                  </Heading>
                  <Text noOfLines={3} color="gray.700">
                    {blog.article}
                  </Text>
                  <Button
                    mt={4}
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

      <Footer />
    </Box>
  );
};

export default AllBlogsScreen;