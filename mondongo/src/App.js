import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import RegisterForm from './Components/LoginForm/LoginRegForm';
import Navbar from './Components/Navbar/Navbar';
import TerraceEquipment from './Components/TerraceEquipment/TerraceEquipment';

function App() {
  return (
    <div>
      <header>
      <Navbar/> 
      </header>
      <body>       
        <TerraceEquipment/>
      </body>
      <footer className='foot'>
        <p>Mondongo S.A</p>
      </footer>
    </div>

  );
}

export default App;
