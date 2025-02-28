import { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { notification } from 'antd';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthContext from './contexts/AuthContext';
import authApi from './api/authApi';
import StoryListPage from './pages/home/StoryListPage';
import ReadStoryPage from './pages/home/ReadStoryPage';
import AboutPage from './pages/home/AboutPage';
import CreateStoryPage from './pages/home/CreateStoryPage';
import NotificationContext from './contexts/NotificationContext';
import EditStoryPage from './pages/home/EditStoryPage';

function App() {

  const [user, setUser] = useState(null);
  const [notifyApi, notificationContextHolder] = notification.useNotification();

  const notifySuccess = useCallback((title, description) => {
    notifyApi.success({ message: title, description });
  }, [notifyApi]);

  const notifyError = useCallback((title, description) => {
    notifyApi.error({ message: title, description });
  }, [notifyApi]);


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
      <NotificationContext value={{ notifySuccess, notifyError }}>
        <AuthContext value={{ user, setUser }}>
          <div className="app">
            {notificationContextHolder}
            <Routes>
              {!user && <>
                <Route path="/" element={<h1>Home page trước khi đăng nhập</h1>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </>}

              {
                user && <>
                  <Route path="/" element={<HomePage />}>
                    <Route element={<StoryListPage />} path="" />
                    <Route element={<ReadStoryPage />} path="story/:id/read" />
                    <Route element={<CreateStoryPage />} path="story/create" />
                    <Route element={<EditStoryPage />} path="story/:id/edit" />
                    <Route element={<AboutPage />} path="about" />
                  </Route>
                </>
              }
            </Routes>
          </div>
        </AuthContext>
      </NotificationContext>

    </BrowserRouter>
  );
}

export default App;
