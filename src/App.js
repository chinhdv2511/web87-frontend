import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { notification } from 'antd';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthContext from './contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import authApi from './api/authApi';

function App() {

  const [user, setUser] = useState(null);

  // kiểm tra trong local storage có access token không.
  // nếu có access token -> lấy lại thông tin người dùng bằng access token
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      axios.defaults.headers["Authorization"] = "Bearer " + accessToken;
      authApi.getProfile().then((result) => {
        console.log(result);
        if (result.isSuccess) {
          setUser(result.data);
        }
      });
    }
  }, []);
  // nếu không có access token -> mặc định ở trang login

  return (
    <BrowserRouter>
      <AuthContext value={{ user, setUser }}>
        <div className="app">
          <Routes>
            {!user && <>
              <Route path="/" element={<h1>Home page trước khi đăng nhập</h1>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </>}

            {
              user && <>
                <Route path="/" element={<HomePage />} />
              </>
            }
          </Routes>
        </div>
      </AuthContext>
    </BrowserRouter>
  );
}

export default App;
