import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../../modules/start/submodules/auth/pages/LoginPage';

function AppRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />}>
          <Route path="overview" element={<Overview />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route> */}
      </Routes>
    </Router>
  );
}

export default AppRoute;
