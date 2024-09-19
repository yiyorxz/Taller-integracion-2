import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import RegisterForm from './Components/LoginForm/LoginRegForm';
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
