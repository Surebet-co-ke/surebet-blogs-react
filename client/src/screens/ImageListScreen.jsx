import {
  Box,
  Button,
  Grid,
  Image,
  IconButton,
  Flex,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';

import { listImages, deleteImage, cleanupImages } from '../actions/imageActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ImageListScreen = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const imageList = useSelector((state) => state.imageList);
  const { loading, error, images } = imageList;

  const imageDelete = useSelector((state) => state.imageDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = imageDelete;

  const imageCleanup = useSelector((state) => state.imageCleanup);
  const { success, deletedFiles, error: cleanupError } = imageCleanup;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    dispatch(listImages());
  }, [dispatch, successDelete, success]);


  const totalPages = Math.ceil(images.length / itemsPerPage);
  const paginatedImages = images.slice(
    itemsPerPage * (currentPage - 1),
    itemsPerPage * currentPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (filename) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      dispatch(deleteImage(filename));
    }
  };

  const handleCleanup = () => {
    dispatch(cleanupImages());
  };


  useEffect(() => {
    if (successDelete) {
      toast({
        title: 'Image deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    if (errorDelete) {
      toast({
        title: 'Error deleting image.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    if (success) {
      toast({
        title: `Image cleanup successful. Deleted ${deletedFiles.length} images.`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
    if (cleanupError) {
      toast({
        title: 'Error during image cleanup.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }, [successDelete, errorDelete, success, cleanupError, deletedFiles, toast]);


  const renderPagination = () => {
    const maxPageNumbersToShow = 5;

    const pages = [];
    if (totalPages <= maxPageNumbersToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return (
      <Flex justify="center" align="center" mt="5" gap="2">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {pages.map((page, index) => (
          <Button
            key={index}
            onClick={() => typeof page === 'number' && handlePageChange(page)}
            disabled={page === currentPage}
            colorScheme={page === currentPage ? 'blue' : 'gray'}
          >
            {page}
          </Button>
        ))}
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
      <Flex direction={{ base: "column", md: "row" }} justify="space-between" mb="4">
        <Text fontSize="xl" fontWeight="bold" m={4} color="brandBlue">
          Manage Images
        </Text>
        <Button
          variant="outline"
          colorScheme="red"
          m={4}
          onClick={handleCleanup}
          alignSelf={{ base: "center", md: "flex-start" }}
        >
          CleanUp Images ?
        </Button>
      </Flex>


      {loadingDelete && <Loader />}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <>
          <Grid
            templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
            gap="6"
          >
            {paginatedImages.map((image, index) => (
              <Box key={index} position="relative" boxShadow="md" p="4" bg="gray.100">
                <Image
                  src={`/api/uploads/${image}`}
                  alt={`Image ${index + 1}`}
                  borderRadius="md"
                  maxH="200px"
                  objectFit="cover"
                  width="100%"
                />
                <IconButton
                  icon={<FaTrash />}
                  aria-label="Delete image"
                  colorScheme="red"
                  size="sm"
                  position="absolute"
                  top="10px"
                  right="10px"
                  onClick={() => handleDelete(image)}
                />
              </Box>
            ))}
          </Grid>

          {/* Render Pagination */}
          {totalPages > 1 && renderPagination()}
        </>
      )}
    </Box>
  );
};

export default ImageListScreen;
