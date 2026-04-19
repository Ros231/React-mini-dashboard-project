import { Link, Routes, Route, useLocation, data} from "react-router-dom";
import { useState, useEffect } from "react";
import InventoryList from "./InventoryList.jsx";
import Addhardware from "./Addhardware.jsx";
import Homeindex from "./Home.jsx"
import '../index.css';
import axios from "axios";

function App() {



const [getDate, setGetDate] = useState([]);


const getdate = async() => {
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL);
    setGetDate(response.data.data);

    console.log("Date fetched successfully:", response.data.data);
  } catch (error) {
    console.error("Error fetching date:", error);
  }
};

  const Location = useLocation();

  useEffect(() => {
    getdate();
  }, []);

  const length = getDate.length;

  return (

    <div className=" p-8 min-h-screen">
      {Location.pathname === "/inventory" ? (

        <nav className="bg-gray-800 p-4 rounded mb-8 justify-between flex">
          <div className="flex items-center gap-2">
            <Link to = "/" className="hover:text-blue-400 font-bold ml-4">🏠 หน้าแรก</Link>
            <Link to = "/inventory" className="hover:text-blue-400 font-bold ml-4">📦 คลังสินค้า</Link>
            <Link to = "/add" className="hover:text-blue-400 font-bold ml-4">➕ เพิ่มอุปกรณ์</Link>
          </div>

          <div>
            <p className="text-gray-400">จำนวนอุปกรณ์ทั้งหมด: {length}</p>
          </div>
        </nav>

      ) : (
          <nav className="bg-gray-800 p-4 rounded mb-8 justify-start flex">
          <div className="flex items-center gap-2">
            <Link to = "/" className="hover:text-blue-400 font-bold ml-4">🏠 หน้าแรก</Link>
            <Link to = "/inventory" className="hover:text-blue-400 font-bold ml-4">📦 คลังสินค้า</Link>
            <Link to = "/add" className="hover:text-blue-400 font-bold ml-4">➕ เพิ่มอุปกรณ์</Link>
          </div>
        </nav>
      )}

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