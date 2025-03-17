import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  Text,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';
import { IoAdd, IoTrashBinSharp, IoPencilSharp, IoEyeSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { listBlogs, createBlog, updateBlog, deleteBlog } from '../actions/blogActions';
import Loader from '../components/Loader';
import Message from '../components/Message';


const BlogListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogDetailsData, setBlogDetailsData] = useState(null);
  const itemsPerPage = 10;

  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [article, setArticle] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const blogList = useSelector((state) => state.blogList);
  const { loading, error, blogs } = blogList;

  const blogDelete = useSelector((state) => state.blogDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = blogDelete;

  const blogCreate = useSelector((state) => state.blogCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate } = blogCreate;

  const blogUpdate = useSelector((state) => state.blogUpdate);
  const { success: successUpdate } = blogUpdate;

  useEffect(() => {
    dispatch(listBlogs(searchTerm));
  }, [dispatch, searchTerm, successCreate, successUpdate, successDelete]);

  const openModal = (blog = null) => {
    setBlogDetailsData(blog);
    if (blog) {
      setAuthor(blog.author);
      setTitle(blog.title);
      setArticle(blog.article);
      setImage(blog.image);
    } else {
      setAuthor('');
      setTitle('');
      setArticle('');
      setImage('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setBlogDetailsData(null);
  };

  const submitHandler = () => {
    if (!title || !article) {
      alert('Please fill out all required fields.');
      return;
    }

    if (blogDetailsData && blogDetailsData.id) {
      dispatch(
        updateBlog(blogDetailsData.id, {
          id: blogDetailsData.id,
          author,
          title,
          article,
          image,
        })
      ).then(() => {
        dispatch(listBlogs(searchTerm));
      });
    } else {
      dispatch(
        createBlog({
          author,
          title,
          article,
          image,
        })
      ).then(() => {
        dispatch(listBlogs(searchTerm));
      });
    }
    closeModal();
  };

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      dispatch(deleteBlog(id));
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post(`/api/uploads`, formData, config);

      setImage(data);
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };

  const totalPages = blogs && Array.isArray(blogs) ? Math.ceil(blogs.length / itemsPerPage) : 0;
  const paginatedBlogs = blogs && Array.isArray(blogs)
    ? blogs.slice(
      itemsPerPage * (currentPage - 1),
      itemsPerPage * currentPage
    )
    : [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    if (endPage - startPage + 1 < maxPageNumbersToShow) {
      startPage = Math.max(1, endPage - maxPageNumbersToShow + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <Button key={1} onClick={() => handlePageChange(1)}>
          1
        </Button>
      );
      if (startPage > 2) {
        pageNumbers.push(<Text key="start-ellipsis">...</Text>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === currentPage}
          colorScheme={i === currentPage ? 'blue' : 'gray'}
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<Text key="end-ellipsis">...</Text>);
      }
      pageNumbers.push(
        <Button key={totalPages} onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </Button>
      );
    }

    return (
      <Flex justify="center" align="center" mt="5" gap="2">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {pageNumbers}
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Flex>
    );
  };

  return (
    <Box p="4" bg="white" borderRadius="lg" boxShadow="md" m={4} width="100%">
      <Text fontSize="xl" fontWeight="bold" m={8} color="brandBlue">
        Blogs Management
      </Text>
      <Flex m={5} alignItems="center" justifyContent="space-between" maxW="1000px">
        <Input
          placeholder="Search ...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          mr="2"
          w="100%"
          maxW="600px"
          bg="white"
          color="black"
          borderColor="gray.300"
          _focus={{ borderColor: 'brandOtherBlue' }}
          caretColor="black"
        />
        <Button leftIcon={<IoAdd />} colorScheme="blue" onClick={() => openModal()}>
          <Text display={{ base: "none", md: "block" }}>Create Blog</Text>
          <Text display={{ base: "block", md: "none" }}>New</Text>
        </Button>
      </Flex>

      {loadingDelete && <Loader />}
      {errorDelete && <Message type="error">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message type="error">{errorCreate}</Message>}
      {successCreate && <Message type="success">Blog created successfully!</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Box
          bgColor="white"
          rounded="lg"
          shadow="lg"
          px="5"
          py="5"
          overflowX="auto"
          maxW="98%"
        >
          <Table variant="simple" colorScheme="blue" size="sm">
            <Thead>
              <Tr>
                <Th>NO</Th>
                <Th>Author</Th>
                <Th>Title</Th>
                <Th>Article</Th>
                <Th>Image</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {paginatedBlogs.map((blog, index) => (
                <Tr key={blog.id}>
                  <Td>{index + 1 + (currentPage - 1) * itemsPerPage}</Td>
                  <Td>{blog.author}</Td>
                  <Td>
                    <Text noOfLines={1} maxW="180px">
                      {blog.title}
                    </Text>
                  </Td>
                  <Td>
                    <Text noOfLines={2} maxW="250px">
                      {blog.article}
                    </Text>
                  </Td>
                  <Td>{blog.image ? 'Yes' : 'No'}</Td>
                  <Td>
                    <Flex>
                      <Button
                        size="sm"
                        colorScheme="green"
                        variant="outline"
                        mr="2"
                        onClick={() => openModal(blog)}
                      >
                        <Icon as={IoPencilSharp} />
                      </Button>
                      <Button
                        as={RouterLink}
                        to={`/bloglist/${blog.id}/categories`}
                        size="sm"
                        colorScheme="blue"
                        variant="outline"
                        mr="2"
                      >
                        <Icon as={IoEyeSharp} />
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        variant="outline"
                        onClick={() => deleteHandler(blog.id)}
                      >
                        <Icon as={IoTrashBinSharp} />
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {renderPagination()}
        </Box>
      )}

      {/* Combined Create/Edit Blog Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{blogDetailsData ? 'Edit Blog' : 'Create New Blog'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Author</FormLabel>
              <Input
                placeholder="Enter author name"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="Enter blog title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Article</FormLabel>
              <Textarea
                placeholder="Enter blog article"
                value={article}
                onChange={(e) => setArticle(e.target.value)}
              />
            </FormControl>

            <FormControl mt="4">
              <FormLabel>Image</FormLabel>
              <Input
                type="text"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Input type="file" onChange={uploadFileHandler} mt="2" />
              {uploading && <Loader />}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={submitHandler} colorScheme="blue">
              {blogDetailsData ? 'Update' : 'Save'}
            </Button>
            <Button onClick={closeModal} ml="3">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BlogListScreen;