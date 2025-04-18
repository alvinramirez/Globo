import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HouseList from '../house/HouseList';
import HouseDetail from '../house/HouseDetail';
import HouseAdd from '../house/HouseAdd';
import HouseEdit from '../house/HouseEdit';
import Layout from './Layout';
import './App.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HouseList/>}></Route>
            <Route path="/house/:id" element={<HouseDetail/>}></Route>
            <Route path="/house/add" element={<HouseAdd/>}></Route>
            <Route path="/house/edit/:id" element={<HouseEdit/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
