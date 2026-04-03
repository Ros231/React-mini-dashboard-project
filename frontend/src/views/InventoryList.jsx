import { useEffect, useState } from "react";
import axios from "axios";
import {Package, Cpu, Trash, Gauge, Plus, Minus, Pencil, Save, X} from "lucide-react"
import e from "cors";

function inventory() {
  const [hardwareData, setHardwareData] = useState([]);

const updateStock = async (id, currentQuantity, chagedQuantity) => {
    const newQuantity = currentQuantity + chagedQuantity;

    if (newQuantity < 0) return alert("Quantity cannot be negative");
    
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/${id}`, { quantity: newQuantity });

      setHardwareData(prevData => prevData.map
        (item => item._id === id ? { ...item, quantity: newQuantity } : item));
    }
    catch (error) {
      console.error("Error updating stock:", error);
    }
}

const [searchTerm, setSearchTerm] = useState("");

const filteredHardware = hardwareData.filter(item =>
  item.name?.toLowerCase().includes(searchTerm.toLowerCase()));

  const fetchHardwareData = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_URL);
      setHardwareData(response.data.data);
      console.log("Hardware data fetched successfully:", response.data.data);

    }
    catch (error) {
      console.error("Error fetching hardware data:", error);
    };
    
  }

  const [editingId, setEditingId] = useState(null);

  const [editingName, setEditingName] = useState("");
  const [editingCategory, setEditingCategory] = useState("");

  const saveEdit = async (id) => {
    try{
      await axios.put(`${import.meta.env.VITE_API_URL}/${id}`, {
        name: editingName,
        category: editingCategory,
        modelPath : EditingmodelPath
      });

      setHardwareData(prevData => prevData.map
        (item => item._id === id ? { ...item, name: editingName, category: editingCategory, modelPath : EditingmodelPath } : item));
      setEditingId(null);
    }
    catch (error){
      console.error("Error saving edit:", error);
      alert("Error saving changes. Please try again.");
    }
  }

  const[EditingmodelPath, setEditingmodelPath] = useState("");
  const handleDrop = async (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("ModelFile", file);

    try {
      const response = await axios.post(`http://localhost:5000/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setEditingmodelPath(response.data.filePath);

      console.log("File uploaded successfully:", response.data.filePath);
    }
    catch (error) {
      console.error("Error uploading file:", error);
    }
  }

  



  const deleteHardware = async (id) => {
    if (window.confirm("Are you sure you want to delete this hardware?")) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`);

        setHardwareData(hardwareData.filter(item => item._id !== id));

      }
      catch (error) 
      {
        console.error("Error deleting hardware:", error);
      }
    }
  }
  useEffect(() => {
    fetchHardwareData();
  }, []);

    return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Hardware Data</h1>
      <div className="mt-2 mb-2 w-full ">
      <input className="p-2 w-full bg-gray-800 rounded shadow
        focus:outline-none focus:ring-1 focus:ring-[#ffffff] focus:ring-opacity-50
      
      " 
      
      type="text" placeholder="Search..."  onChange={(e) =>  setSearchTerm(e.target.value)}/>        
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHardware.map((item) => (
            <div key={item._id} className="bg-[#3c6e71] p-2 rounded shadow flex flex-col gap-4">
              
              

              <div className="flex items-center gap-3 text-xl text-bold">

                {editingId === item._id ? (
                  <div className="flex items-center gap-3" >
                    <Cpu size={24} />
                    <h2>Name : </h2>
                    <input onChange={(e) => setEditingName(e.target.value)} type="text" 
                    value={editingName} className=" text-xl text-bold w-1/2"/>
                  </div>
                ) : (
                  
                  <div className="flex items-center gap-3 text-xl text-bold">
                    <Cpu size={24} />
                    Name : {item.name}
                  </div>
                )}
              </div>

              <div>
                {editingId === item._id ? (
                  
                  <div className="flex items-center gap-3 text-lg">
                    <Package size={24} />
                    Category :
                   <select value={editingCategory } className=" p-0.5 bg-gray-700 rounded"
                    onChange={(e) => setEditingCategory(e.target.value)}>
                        <option value="MCU">MCU</option>
                        <option value="Sensor">Sensor</option>
                        <option value="Motor">Motor</option>
                    </select>
                </div>

                
                ) : (
                  <div className="flex items-center gap-3 text-lg">
                    <Package size={24} />
                    Category : {item.category}
                  </div>
                )}
                </div>

              <div>
                {editingId === item._id &&  (

                  <div
                    onDragOver={(e) => e.preventDefault()}
                    
                    onDrop={handleDrop}
                    className="mt-2 border-2 border-dashed border-blue-400 p-4 rounded-lg text-center bg-blue-900/20 hover:bg-blue-900/40 transition-all"
                  >
                    <p className="text-sm"> {EditingmodelPath ? "✨ File uploaded: " + EditingmodelPath.split('/').pop() : "Drop .glb file here"}</p>
                  </div>
                )}

                { editingId !== item._id && ( item.modelPath ? (
                 
                  <div>
                    <model-viewer src={`http://localhost:5000${item.modelPath}`} alt="A 3D model of an Arduino Uno" 
                      auto-rotate camera-controls ar shadow-intensity="1" class="w-full h-64 rounded">
                    </model-viewer>
                  </div>

                ) : (
                    <div className="flex items-center gap-3 text-lg">
                     <img src = "/Noimage.png" className="w-full object-cover rounded mt-2"/>
                      
                    </div>
              
                ))}
                  
              </div>  
                
              <div className="flex flex-col gap-1 mt-auto">
                  <div className="flex items-center gap-3 text-lg">
                    <Gauge size={24} />
                    <span className={`text-xl ${item.quantity < 2 ? 'text-red-500' : '' }`}>Stock : </span>
                    {item.quantity}
                  </div>   
              </div>
                  <span className="text-sm">Stock Management</span>
                  <div>
                  {editingId === item._id ? (
                    <div className="flex gap-2 mr-2 pb-2">
                      <button onClick={() => saveEdit(item._id)}
                      className="bg-[#353535] p-2 rounded shadow hover:bg-green-900">
                        <Save size={24} />
                      </button>

                      <button onClick={() => setEditingId(null)}
                      className="bg-[#353535] p-2 rounded shadow hover:bg-red-900">
                        <X size={24} />
                      </button>

                    </div>
                  ) : (
                    <div className="flex gap-2 mr-2 pb-2">
                    <button onClick = {() => updateStock(item._id, item.quantity, 1) } 
                      className="bg-[#353535] p-2 rounded shadow"><Plus size={24} /></button>
                      
                      <button onClick = {() => updateStock(item._id, item.quantity, -1) } 
                      className="bg-[#353535] p-2 rounded shadow"><Minus size={24} /></button>

                      <button onClick = {() => deleteHardware(item._id) } 
                      className="bg-[#353535] p-2 rounded shadow hover:bg-red-900"><Trash size={24} /></button>

                      <button onClick = {() => {
                        setEditingId(item._id);
                        setEditingName(item.name);
                        setEditingCategory(item.category);
                        setEditingmodelPath(item.modelPath);
                      }}
                      className="bg-[#353535] p-2 rounded shadow hover:bg-blue-900"><Pencil size={24} /></button>
                    </div>
                  )}
                  
                  </div>
            </div>

          ))}

            

        </div>
    </div>
  );
}
export default inventory;