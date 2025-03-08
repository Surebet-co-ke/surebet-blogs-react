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
import BlogListScreen from './screens/BlogListsScreen';
import UserListScreen from './screens/UserListScreen';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Non-dashboard routes */}
        
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
          
        <Route path="/" element={<AllBlogsScreen/>} />
          <Route path="/blog/:id"  element={<BlogViewScreen/>} />

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
          <Route path="/admin-home" element={<Dashboard/>} />
          <Route path="/bloglist" element={<BlogListScreen/>} />
          <Route path="/admin-users" element={<UserListScreen/>} />
        

          {/* Customer Routes */} 
          <Route path="/home" element={<AllBlogsScreen />} />

        </Routes>
        <Footer />
      </Flex>
    </>
  );
}

export default App;
