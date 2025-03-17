import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Button,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';

import { getBlogDetails } from '../actions/blogActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const AdminBlogScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const blogDetails = useSelector((state) => state.blogDetails);
  const { loading, error, blog } = blogDetails;

  useEffect(() => {
    dispatch(getBlogDetails(id));
  }, [dispatch, id]);

  const contentBg = useColorModeValue('white', 'gray.800');

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
      {/* Blog Content */}
      <Box p={4} maxW="800px" mx="auto" bg={contentBg} borderRadius="lg" boxShadow="md" mt={8}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message type="error">{error}</Message>
        ) : (
          <>
            <Image
              src={formatImageUrl(blog.image)}
              alt={blog.title}
              h="400px"
              w="100%"
              objectFit="cover"
              borderRadius="lg"
            />
            <Box p={4}>
              <Text fontSize="sm" color="gray.500" mb={2}>
                By {blog.author} | {new Date(blog.created_at).toLocaleDateString()}
              </Text>

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

              <Heading as="h2" size="xl" mb={4} color="brandBlue">
                {blog.title}
              </Heading>
              <Text fontSize="lg" color="gray.700" whiteSpace="pre-line">
                {blog.article}
              </Text>
              <Button
                mt={4}
                colorScheme="brandRed"
                onClick={() => navigate('/blogs')}
              >
                Back to Blogs
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default AdminBlogScreen;