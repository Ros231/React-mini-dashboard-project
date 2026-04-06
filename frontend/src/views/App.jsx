import { Link, Router, Routes, Route} from "react-router-dom";
import InventoryList from "./InventoryList.jsx";
import Addhardware from "./Addhardware.jsx";
import Homeindex from "./Home.jsx"
import '../index.css';

function App() {
  return (
      <div className=" p-8 min-h-screen">
        <nav className="bg-gray-800 p-4 rounded mb-8 justify-end flex">
          <Link to = "/" className="hover:text-blue-400 font-bold ml-4">🏠 หน้าแรก</Link>
          <Link to = "/inventory" className="hover:text-blue-400 font-bold ml-4">📦 คลังสินค้า</Link>
          <Link to = "/add" className="hover:text-blue-400 font-bold ml-4">➕ เพิ่มอุปกรณ์</Link>
        </nav>
        <div className="container mx-auto">
          <Routes>
            <Route path="/inventory" element={<InventoryList />} />
            <Route path="/add" element={<Addhardware />} />
            <Route index element={<Homeindex />} />
          </Routes>
        </div>
      </div>
  ) 
}

export default App;