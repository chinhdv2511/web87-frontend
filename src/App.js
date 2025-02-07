import { notification } from 'antd';

import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div className="app">
      <LoginPage />
    </div>
  );
}

export default App;
