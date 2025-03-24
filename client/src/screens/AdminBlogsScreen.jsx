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

const AdminBlogsScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const blogList = useSelector((state) => state.blogList);
    const { loading, error, blogs } = blogList;

    useEffect(() => {
        dispatch(listBlogs());
    }, [dispatch]);

    const handleBlogClick = (id) => {
        navigate(`/blogs/${id}`);
    };

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

    const createTextPreview = (html) => {
        if (!html) return 'No content available';
        
        const plainText = html.replace(/<[^>]*>/g, '');
        return plainText.length > 150 
            ? plainText.substring(0, 150) + '...' 
            : plainText;
    };

    return (
        <Box p="4" bg="white" borderRadius="lg" boxShadow="md" m={4} width="100%">
            <Text fontSize="xl" fontWeight="bold" m={8} color="brandBlue">
                Blogs
            </Text>

            {/* Blog List */}
            <Box p={4} mx="auto">
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
                                    <Text 
                                        noOfLines={3} 
                                        color="gray.700"
                                        dangerouslySetInnerHTML={{ 
                                            __html: createTextPreview(blog.article) 
                                        }}
                                    />
                                    <Button
                                        mt={4}
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleBlogClick(blog.id);
                                        }}
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

export default AdminBlogsScreen;