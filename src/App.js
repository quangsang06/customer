import HomePage from "./components/HomePage";
import CreateUser from './components/CreateUser'
import Chart from './components/Chart'
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/create" element={<CreateUser />}></Route>
          <Route path="/chart" element={<Chart />}></Route>
        </Routes>
      </BrowserRouter>
      ,
    </div>
  );
}

export default App;
