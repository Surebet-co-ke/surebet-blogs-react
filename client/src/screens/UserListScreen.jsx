import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  Text,
  Input,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Spacer,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Checkbox,
} from '@chakra-ui/react';
import {
  IoCheckmarkCircleSharp,
  IoCloseCircleSharp,
  IoPencilSharp,
  IoTrashBinSharp,
} from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deleteUser, listUsers, updateUser } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading: loadingDetails, error: errorDetails } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: loadingUpdate, success: successUpdate } = userUpdate;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    } else {
      dispatch(listUsers(query));
    }
  }, [dispatch, navigate, userInfo, query]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: 'USER_UPDATE_RESET' });
      setIsEditModalOpen(false);
    }
  }, [dispatch, successUpdate]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id)).then(() => {
        dispatch(listUsers(query));
      });
    }
  };


  const openEditModal = (user) => {
    setSelectedUser(user);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setRole(user.role);
    setIsAdmin(user.isAdmin);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        updateUser(selectedUser.id, {
          id: selectedUser.id,
          name,
          email,
          phone,
          role,
          isAdmin,
          password,
        })
      ).then(() => {
        dispatch(listUsers(query));
        closeEditModal();
      });
    }
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = users.slice(
    itemsPerPage * (currentPage - 1),
    itemsPerPage * currentPage
  );

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
    <>
      <Box p="4" bg="white" borderRadius="lg" boxShadow="md" m={4} width="100%">
        <Text fontSize="xl" fontWeight="bold" m={8} color="brandBlue">
          Users
        </Text>
        <Flex alignItems="center" mb="4">
          <Input
            placeholder="Search user..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            mr="2"
            w="100%"
            maxW="600px"
            bg="white"
            color="black"
            borderColor="gray.300"
            _focus={{ borderColor: 'brandOtherBlue' }}
            caretColor="black"
          />
        </Flex>

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
            maxW="1000px"
          >
            <Table variant="simple" colorScheme="blue" size="sm">
              <Thead>
                <Tr>
                  <Th>No.</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Phone</Th>
                  <Th>Role</Th>
                  <Th>Admin</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {paginatedUsers.map((user, index) => (
                  <Tr key={user.id}>
                    <Td>{index + 1 + (currentPage - 1) * itemsPerPage}</Td>
                    <Td>{user.name}</Td>
                    <Td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </Td>
                    <Td>{user.phone}</Td>
                    <Td>{user.role}</Td>
                    <Td>
                      {user.isAdmin ? (
                        <Icon
                          as={IoCheckmarkCircleSharp}
                          color="blue.600"
                          w="8"
                          h="8"
                        />
                      ) : (
                        <Icon
                          as={IoCloseCircleSharp}
                          color="red.600"
                          w="8"
                          h="8"
                        />
                      )}
                    </Td>
                    <Td>
                      <Flex alignItems="center">
                        <Button
                          mr="4"
                          onClick={() => openEditModal(user)}
                          colorScheme="blue"
                          variant="outline"
                        >
                          <Icon as={IoPencilSharp} size="sm" />
                        </Button>
                        <Button
                          mr="4"
                          colorScheme="red"
                          variant="outline"
                          onClick={() => deleteHandler(user.id)}
                        >
                          <Icon as={IoTrashBinSharp} size="sm" />
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

        <Spacer h="5" />

        {/* Edit User Modal */}
        <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {loadingDetails ? (
                <Loader />
              ) : errorDetails ? (
                <Message type="error">{errorDetails}</Message>
              ) : (
                <Box>
                  {message && <Message type="error">{message}</Message>}
                  <form onSubmit={submitHandler}>
                    <FormControl id="name" isRequired>
                      <FormLabel>Name</FormLabel>
                      <Input
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FormControl>
                    <FormControl id="email" isRequired mt="4">
                      <FormLabel>Email Address</FormLabel>
                      <Input
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormControl>
                    <FormControl id="phone" mt="4">
                      <FormLabel>Phone Number</FormLabel>
                      <Input
                        type="number"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </FormControl>
                   <FormControl mb="4">
                      <FormLabel htmlFor="role">Role</FormLabel>
                      <Select
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value )}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </Select>
                    </FormControl>
                    <FormControl id="isAdmin" mt="4">
                      <FormLabel>Admin</FormLabel>
                      <Checkbox
                        isChecked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                      >
                        Is Admin
                      </Checkbox>
                    </FormControl>
                    <FormControl id="password" mt="4">
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormControl>
                    <FormControl id="confirmPassword" mt="4">
                      <FormLabel>Confirm Password</FormLabel>
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </FormControl>
                  </form>
                </Box>
              )}
            </ModalBody>
            <ModalFooter>              
              <Button type="submit" colorScheme="blue"   onClick={submitHandler}isLoading={loadingUpdate}>
                Update
              </Button>
              <Button colorScheme="red" ml={8} onClick={closeEditModal}>
                Close
              </Button>              
            </ModalFooter>
          </ModalContent>
        </Modal>

        
      </Box>
    </>
  );
};

export default UserListScreen;
