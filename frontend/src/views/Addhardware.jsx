import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function addHardware(){
    const[name, setName] = useState("");
    const[category, setCategory] = useState("MCU");
    const[quantity, setQuantity] = useState("0");

    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            
            await axios.post(import.meta.env.VITE_API_URL ,{
                name,
                category,
                quantity
            });
            alert("Hardware added successfully!");
            navigate("/");
        }
        catch (error){
            console.error("Error adding hardware:", error);
            alert("Error adding hardware. Please try again.");
        }
    };
    return(
        <div className="p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">เพิ่มอุปกรณ์ใหม่</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input 
                    type="text" placeholder="ชื่ออุปกรณ์"
                    className="p-2 bg-gray-700 rounded"
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <select className="p-2 bg-gray-700 rounded"
                 onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="MCU">MCU</option>
                    <option value="Sensor">Sensor</option>
                    <option value="Motor">Motor</option>
                </select>
                <input
                    type="number" placeholder="จำนวน"
                    className = "p-2 bg-gray-700 rounded"
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
                <button
                    type="submit" className="bg-blue-600 p-2 rounded hover:bg-blue-700"
                >
                    บันทึกการเพิ่มอุปกรณ์
                </button>
            </form>
        </div>
    )
}

export default addHardware;