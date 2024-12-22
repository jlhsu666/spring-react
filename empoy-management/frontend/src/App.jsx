import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import FooterComponent from './components/FooterComponent';
import EmployeeComponent from './components/EmployeeComponent';

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route index element={<ListEmployeeComponent />} />
        <Route path="/employees" element={<ListEmployeeComponent />} />
        <Route path="/add-employee" element={<EmployeeComponent />} />
        <Route path="/edit-employee/:id" element={<EmployeeComponent />} />
      </Routes>
      <FooterComponent />
    </BrowserRouter>
  );
}


export default App
