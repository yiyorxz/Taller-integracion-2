import React from 'react';
import { UserProvider } from './contexts/UserContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componentes/login';
import Registro from './componentes/registro';
import HomePage from './componentes/Homepage';
import Profile from './componentes/Profile';
import ProtectedRoute from './permisos/ProtectedRoute';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route
            path="/homepage"
            element={
              <ProtectedRoute role="comprador" route="/homepage">
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute role="comprador" route="/profile">
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;


// // src/App.js
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from './componentes/login';
// import Registro from './componentes/registro';
// import HomePage from './componentes/Homepage';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/registro" element={<Registro />} />
//         <Route path="/homepage" element={<HomePage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;