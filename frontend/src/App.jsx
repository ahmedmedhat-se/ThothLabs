import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AstroThoth from './Components/AstroThoth.jsx';
import News from './Components/News.jsx';
import CosmicExplorer from './Components/CosmicExplorer.jsx';
import PhaExplorer from './Components/NEO.jsx';
import Workspace from "./Components/Workspace.jsx";

// Importing Layouts
import Header from './Components/layout/Header.jsx';
import Homepage from './Components/layout/Homepage.jsx';
import Footer from './Components/layout/Footer.jsx';
import NotFound from "./Components/layout/NotFound.jsx";
import GoToTop from "./Components/layout/GoToTop.jsx";

// Importing Registerations
import AuthForm from "./Components/registerations/AuthForm.jsx";
import Logout from "./Components/registerations/logout.jsx";

// Importing Dashboards
import AdminDashboard from "./Components/admin/AdminDashboard";
import UserDashboard from "./Components/admin/UserDashboard";
import ProtectedAdminRoute from "./Components/admin/ProtectedAdminRoute";
import ProtectedUserRoute from "./Components/admin/ProtectedUserRoute";

// Importing Research Components
import CreateResearch from './Components/admin/CreateResearch.jsx';

function App() {
  return (
    <>
        <Header />
        <AstroThoth />
        <Routes>
          {/* Layout Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path='/Orrery-Website' element={<Homepage />}></Route>
          <Route path="*" element={<NotFound />} />
          
          {/* Components Routes */}
          <Route path='/news' element={<News />}></Route>
          <Route path='/cosmic-explorer' element={<CosmicExplorer />}></Route>
          <Route path='/pha-explorer' element={<PhaExplorer />}></Route>
          <Route path="/workspace" element={<Workspace />}></Route>

          {/* Protected Admin Routes */}
          <Route element={<ProtectedAdminRoute />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/create-research" element={<CreateResearch />} />
          </Route>

          {/* Protected User Routes */}
          <Route element={<ProtectedUserRoute />}>
            <Route path="/user-dashboard" element={<UserDashboard />} />
          </Route>
          
          {/* Authentication Routes */}
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <GoToTop />
        <Footer />
    </>
  );
}

export default App;