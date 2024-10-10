import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import HomePage from './pages/Homepage';
import LoginPage from './pages/loginpage';
import RegisterPage from './pages/Registerpage';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div>
      <header>
      <Navbar/> 
      </header>
      <body>       
        <RegisterForm/>
      </body>
        <Footer/>
    </div>

  );
}

export default App;
