import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import RegisterForm from './Components/LoginForm/LoginRegForm';
import Navbar from './Components/Navbar/Navbar';


function App() {
  return (
    <div>
      <header>
      <Navbar/> 
      </header>
      <body>       
        <RegisterForm/>
      </body>
      <footer className='foot'>
        <p>Mondongo S.A</p>
      </footer>
    </div>

  );
}

export default App;
