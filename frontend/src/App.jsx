import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreateSoftware from './pages/CreateSoftware';
import RequestAccess from './pages/RequestAccess';
import PendingRequests from './pages/PendingRequests';

const App = () => {
  const role = localStorage.getItem('role');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {role === 'Admin' && <Route path="/create-software" element={<CreateSoftware />} />}
        {role === 'Employee' && <Route path="/request-access" element={<RequestAccess />} />}
        {role === 'Manager' && <Route path="/pending-requests" element={<PendingRequests />} />}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;