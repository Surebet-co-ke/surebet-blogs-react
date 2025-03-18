import React from 'react';
import { Flex } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SidebarWithHeader from './components/SidebarWithHeader';
import Footer from './components/Footer';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import AllBlogsScreen from './screens/AllBlogsScreen.jsx';
import BlogViewScreen from './screens/BlogViewScreen.jsx';

import Dashboard from './screens/Dashboard';
import AdminBlogsScreen from './screens/AdminBlogsScreen.jsx';
import AdminBlogScreen from './screens/AdminBlogScreen.jsx';
import BlogListScreen from './screens/BlogListsScreen';
import BlogCategoriesScreen from './screens/BlogCategoriesScreen.jsx';
import ImageListScreen from './screens/ImageListScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import UserListScreen from './screens/UserListScreen';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Non-dashboard routes */}

        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />

        <Route path="/" element={<AllBlogsScreen />} />
        <Route path="/blog/:id" element={<BlogViewScreen />} />

        {/* Dashboard routes */}
        <Route path="/*" element={<DashboardRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

function DashboardRoutes() {
  return (
    <>
      <SidebarWithHeader />
      <Flex
        as="main"
        mt="0"
        direction="column"
        bgColor="purple.50"
        ml={{ base: 0, md: 60 }}
      >
        <Routes>
          <Route path="/admin-home" element={<Dashboard />} />
          <Route path="/blogs" element={<AdminBlogsScreen />} />
          <Route path="/blogs/:id" element={<AdminBlogScreen />} />
          <Route path="/bloglist" element={<BlogListScreen />} />
          <Route path="/bloglist/:blogId/categories" element={<BlogCategoriesScreen />} />
          <Route path="/imagelist" element={<ImageListScreen />} /> 
          <Route path="/admin-users" element={<UserListScreen />} />


          {/* Customer Routes */}
          <Route path="/blogs" element={<AdminBlogsScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />


        </Routes>
        <Footer />
      </Flex>
    </>
  );
}

export default App;
