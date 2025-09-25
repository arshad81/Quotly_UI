import Dashboard from './pages/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AdminPageUI from './pages/Admin';
import { AuthProvider } from './AuthProvider';
import Saved from './pages/Saved';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter >
        <Routes >
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPageUI />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
