import { Link } from "react-router-dom";

function Home() {

    return (
        <div className="home flex flex-row items-center justify-center mt-30">
          <img src = "/IOT.png" className="w-3/5"></img>
        <div className="p-8 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">ยินดีต้อนรับสู่ระบบจัดการคลังอุปกรณ์</h1>
          <p className="text-lg mb-4">ระบบนี้ช่วยให้คุณสามารถจัดการคลังอุปกรณ์ของคุณได้อย่างง่ายดาย ไม่ว่าจะเป็นการเพิ่มอุปกรณ์ใหม่ การแก้ไขข้อมูล หรือการลบอุปกรณ์ที่ไม่ใช้งานแล้ว</p>
          <p className="text-lg mb-4">เริ่มต้นด้วยการเพิ่มอุปกรณ์ใหม่เข้าสู่ระบบ และจัดการคลังของคุณได้อย่างมีประสิทธิภาพ!</p>
          <div className="flex gap-4 mt-6">
            <Link to ="/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">เพิ่มอุปกรณ์ใหม่</Link>
            <Link to ="/inventory" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">ดูคลังอุปกรณ์</Link>
          </div>
        </div>
      </div>
    );
}

export default Home