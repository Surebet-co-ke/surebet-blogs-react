import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  useColorModeValue,
  Flex,
  Badge,
} from '@chakra-ui/react';
import DOMPurify from 'dompurify';

import { getBlogDetails } from '../actions/blogActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import LandingHeader from './LandingHeader';
import Footer from '../components/Footer';


const BlogViewScreen = () => {
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

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
          'p', 'strong', 'em', 'u', 's', 'a', 'ul', 'ol', 'li',
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'br', 'span'
        ],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'style', 'class']
      })
    };
  };


  return (
    <Box>
      <LandingHeader />

      {/* Blog Content */}
      <Box p={4} maxW="800px" mx="auto" bg={contentBg} borderRadius="lg" boxShadow="md" mt={4}>
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

              {/* Updated article display */}
              <Box
                className="ql-editor"
                dangerouslySetInnerHTML={createMarkup(blog.article)}
                sx={{
                  '& p': { mb: 4 },
                  '& h2': { fontSize: 'xl', fontWeight: 'bold', mt: 6, mb: 4 },
                  '& ul, & ol': { pl: 6, mb: 4 },
                  '& li': { mb: 2 },
                  '& a': { color: 'blue.500', textDecoration: 'underline' },
                }}
              />

              <Button
                mt={4}
                onClick={() => navigate('/')}
              >
                Back to Blogs
              </Button>
            </Box>
          </>
        )}
      </Box>

      <Footer />
    </Box>
  );
};

export default BlogViewScreen;