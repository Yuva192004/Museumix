import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import UserProfile from './pages/UserProfile';
import Gallery from './pages/Gallery';
import ArtworkUpload from './pages/ArtworkUpload';
import CreateAccount from './pages/CreateAccount';
import Login from './pages/Login';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';
import ArtBlog from './pages/ArtBlog';
import ContactPage from './pages/ContactPage';
// Make sure these components exist in the correct locations
import FeaturedArtists from './pages/FeaturedArtists';
import Collections from './pages/Collections';
import VirtualExhibition from './pages/VirtualExhibition';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/SideBar';


// Protected route component to check if user is logged in
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  if (!isLoggedIn) {
    // Redirect to login if not logged in
    return <Navigate to="/login" />;
  }
  
  return children;
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Sidebar />
        <main>
          <Routes>
            {/* Home/Landing page */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Protected routes that require authentication */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } 
            />
              <Route 
              path="/gallery" 
              element={
                <ProtectedRoute>
                  <Gallery />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/upload" 
              element={
                <ProtectedRoute>
                  <ArtworkUpload />
                </ProtectedRoute>
              } 
            />

            
            {/* Public routes */}
            <Route path="/featured-artists" element={<FeaturedArtists />} />
            <Route path='/collections' element={<Collections/>} />
            <Route path='/exhibitions' element={<VirtualExhibition/>} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<ArtBlog />} />
            
            {/* Fallback route for unknown paths */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;