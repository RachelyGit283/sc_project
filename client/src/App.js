import logo from './logo.svg';
import './App.css';
import { Login } from './comp/login';
import { Register } from './comp/register';
import Parking from './comp/Parking';
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import './index.css';
import './flags.css';
import AllCars from './comp/AllCars';
import TravelCalculator from './comp/TravelCalculator';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import PositionedObjects from './comp/PositionedObjects';
// function App() {
//   return (
//     <div className="App">
//         <Router>
//       <Routes>
//         <Route path="/" element={<AllCars />} />
//         <Route path="/other" element={<Parking />} />
//       </Routes>
//     </Router>
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */
//       // <TravelCalculator/>
//       // <Parking/>
//       // <AllCars/>
//       // <Register/>
//     // <Login/>
//       }
//     </div>
//   );
// }

// export default App;
// import { Routes, Route } from "react-router-dom";
// import AllCars from './comp/AllCars';
// import Parking from './comp/Parking';

function App() {
  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />

        <Route path="/Register" element={<Register/>} />
        <Route path="/allcars" element={<AllCars />} />

        <Route path="/parking" element={<Parking />} />
        <Route path="/PositionedObjects" element={<PositionedObjects />} />

      </Routes>
    </div>
  );
}

export default App;