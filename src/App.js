import './App.css';

// router
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

// hooks
import { useAuth } from './hooks/useAuth';

// pages
import Home from './pages/Home/Home';
import Posts from './pages/Home/Posts';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Photo from './pages/Photo/Photo';
import EditProfile from './pages/EditProfile/EditProfile';
import Profile from './pages/Profile/Profile';
import Search from './pages/Search/Search';

// components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [auth, loading] = useAuth();

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={auth ? <Posts /> : <Navigate to="/login" />} />
            <Route path="/login" element={!auth ? <Login /> : <Navigate to="/posts" />} />
            <Route path="/register" element={!auth ? <Register /> : <Navigate to="/posts" />} />
            <Route path="/profile" element={auth ? <EditProfile /> : <Navigate to="/login" />} />
            <Route path="/search" element={auth ? <Search /> : <Navigate to="/login" />} />
            <Route path="/users/:id" element={auth ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/photos/:id" element={auth ? <Photo /> : <Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;