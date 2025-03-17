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
  useDisclosure,
  Collapse,
} from '@chakra-ui/react';
import { IoAdd, IoTrashBinSharp, IoPencilSharp, IoArrowBack } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getBlogDetails,
} from '../actions/blogActions';

const BlogCategoriesScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [categoryDetailsData, setCategoryDetailsData] = useState(null);
  const [name, setName] = useState('');
  const [showFullArticle, setShowFullArticle] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const blogDetails = useSelector((state) => state.blogDetails);
  const { loading: loadingBlog, error: errorBlog, blog } = blogDetails;

  const categoryList = useSelector((state) => state.categoryList);
  const { loading: loadingCategories, error: errorCategories, categories } = categoryList;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate } = categoryCreate;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = categoryUpdate;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = categoryDelete;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    } else {
      dispatch(getBlogDetails(blogId));
      dispatch(listCategories(blogId));
    }
  }, [dispatch, navigate, userInfo, blogId, successCreate, successUpdate, successDelete]);

  const openModal = (category = null) => {
    setCategoryDetailsData(category);
    if (category) {
      setName(category.name);
    } else {
      setName('');
    }
    onOpen();
  };

  const closeModal = () => {
    onClose();
    setCategoryDetailsData(null);
  };

  const submitHandler = () => {
    if (!name) {
      alert('Please provide a category name.');
      return;
    }

    if (categoryDetailsData && categoryDetailsData.id) {
      dispatch(updateCategory(blogId, categoryDetailsData.id, { name })).then(() => {
        dispatch(listCategories(blogId));
      });
    } else {
      dispatch(createCategory(blogId, { name })).then(() => {
        dispatch(listCategories(blogId));
      });
    }
    closeModal();
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      dispatch(deleteCategory(blogId, id));
    }
  };

  return (
    <Box p="4" bg="white" borderRadius="lg" boxShadow="md" m={4} width="100%">
      {/* Back Button */}
      <Button
        leftIcon={<IoArrowBack />}
        colorScheme="blue"
        variant="outline"
        onClick={() => navigate('/bloglist')}
        mb="4"
      >
        Back
      </Button>

      {/* Centered Blog Heading */}
      <Text fontSize="xl" fontWeight="bold" color="brandBlue" textAlign="center" mb="8">
        Blog Categories
      </Text>

      {loadingBlog ? (
        <Loader />
      ) : errorBlog ? (
        <Message type="error">{errorBlog}</Message>
      ) : (
        <Box mb="8">
          <Text fontSize="lg" fontWeight="bold" mb="2">
            Blog Details
          </Text>
          <Text fontWeight="bold">Title:</Text>
          <Text mb="2">{blog?.title}</Text>
          <Text fontWeight="bold">Author:</Text>
          <Text mb="2">{blog?.author}</Text>
          <Text fontWeight="bold">Article:</Text>
          <Collapse in={showFullArticle} animateOpacity>
            <Text mb="2">{blog?.article}</Text>
          </Collapse>
          {!showFullArticle && (
            <Text mb="2">{blog?.article?.substring(0, 100)}...</Text>
          )}
          <Button
            mt="2"
            colorScheme="blue"
            variant="outline"
            onClick={() => setShowFullArticle(!showFullArticle)}
          >
            {showFullArticle ? 'Show Less' : 'View Full Article'}
          </Button>
        </Box>
      )}

      {/* Categories Section */}
      <Flex justify="space-between" align="center" mb="4">
        <Text fontSize="lg" fontWeight="bold">
          Categories
        </Text>
        <Button leftIcon={<IoAdd />} colorScheme="blue" onClick={() => openModal()}>
          Add Category
        </Button>
      </Flex>

      {loadingDelete && <Loader />}
      {errorDelete && <Message type="error">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message type="error">{errorCreate}</Message>}
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message type="error">{errorUpdate}</Message>}
      {loadingCategories ? (
        <Loader />
      ) : errorCategories ? (
        <Message type="error">{errorCategories}</Message>
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
                <Th>Name</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {categories.map((category, index) => (
                <Tr key={category.id}>
                  <Td>{index + 1}</Td>
                  <Td>{category.name}</Td>
                  <Td>
                    <Flex>
                      <Button
                        size="sm"
                        colorScheme="green"
                        variant="outline"
                        mr="2"
                        onClick={() => openModal(category)}
                      >
                        <Icon as={IoPencilSharp} />
                      </Button>
                      <Button
                        size="sm"
                        colorScheme="red"
                        variant="outline"
                        onClick={() => deleteHandler(category.id)}
                      >
                        <Icon as={IoTrashBinSharp} />
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}

      {/* Combined Create/Edit Category Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{categoryDetailsData ? 'Edit Category' : 'Create New Category'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Enter category name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={submitHandler} colorScheme="blue">
              {categoryDetailsData ? 'Update' : 'Save'}
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

export default BlogCategoriesScreen;