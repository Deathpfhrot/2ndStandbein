import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AllProductsPage from './pages/AllProductsPages';
import Dashboard from './pages/dashboard';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllProductsPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
