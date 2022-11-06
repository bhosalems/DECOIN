import logo from './logo.svg';
import './App.css';
import Navbar from '../src/components/Navbar';
import HomePage from '../src/components/HomePage';
import Home from '../src/components/Home';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Web3 from "web3";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";



function App() {
  return (
    <Router>
    <Navbar />

    <ToastContainer theme="light" autoClose={5000} />

    <Routes>
      <Route path="/" exact={true} element={<HomePage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/homepage" element={<Home />} />
      
    </Routes>
  </Router>
  );
}

export default App;
