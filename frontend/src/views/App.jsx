import { Link, Router, Routes, Route} from "react-router-dom";
import InventoryList from "./InventoryList.jsx";
import Addhardware from "./Addhardware.jsx";
import '../index.css';

function App() {
  return (
      <div className=" p-8 min-h-screen">
        <nav className="bg-gray-800 p-4 rounded mb-8">
          <Link to = "/" className="hover:text-blue-400 font-bold">📦 คลังสินค้า</Link>
          <Link to = "/add" className="hover:text-blue-400 font-bold ml-4">➕ เพิ่มอุปกรณ์</Link>
        </nav>
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<InventoryList />} />
            <Route path="/add" element={<Addhardware />} />
          </Routes>
        </div>
      </div>
  ) 
}

export default App;