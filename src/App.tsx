import Dashboard from './pages/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AdminPageUI from './pages/Admin';

function App() {
  return (
    <BrowserRouter >
      <Routes >
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPageUI />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
