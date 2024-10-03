import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddEmploye from './Pages/AddEmploye/AddEmploye';
import Home from './Pages/Home/Home';
import EmployeEdit from './Pages/EmployeEdit/EmployeEdit';
import Header from './Component/Header/Header';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Employes from './Pages/Employ/Employes';


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        
      <Header /> 

        <Routes>
          <Route
            path="/"
            element={ <Home />}
          />
          <Route path="/employes" element={<Employes />} />
          <Route path="/editemploye/:id" element={<EmployeEdit />} />
          <Route
            path="addemploye"
            element={ <AddEmploye /> }
          />
          
          <Route path="register" element={<Register />} />
          <Route
            path="login"
            element={<Login  />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
