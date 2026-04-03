require("dotenv").config();

const mongoose = require("mongoose");
async function connectDB() {
    try {
    await mongoose.connect(process.env.MONGODB_URI,);
    console.log("Connected to Database!");
    }catch (error) {
        console.error("Error connecting to Database:", error);
        process.exit(1);
    }
}

const cors = require("cors");
const fs = require("fs");
const Hardware = require("./models/DB");
const multer = require("multer");
const path = require("path");

const express = require("express");
const app = express();
const port = 5000;

app.use(cors());
app.use('/Component', express.static(path.join(__dirname,'public/Component')));

connectDB();

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null, 'public/Component/')
    },
    filename : (req,file,cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

const dir = './public/Component/';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
    console.log("สร้างโฟลเดอร์ public/Component ให้แล้วครับ Rose!");
}

app.post('/api/upload', upload.single('ModelFile'), (req,res) => {
    try {
        const filePath = `/Component/${req.file.filename}`;
        res.status(200).json({
            message : "File uploaded successfully",
            filePath : filePath
        })
    }
    catch(error) {
        console.error("Error uploading file:", error);
        res.status(500).json({
            message : "Error uploading file"
        })
    }
})

app.use(express.json());

app.get('/api/hardware', async (req,res) => {
    try {
        const hardwareList = await Hardware.find();
        res.status(200).json({
            message : "Hardware list get successfully",
            data : hardwareList
        })
    }
    catch(error) {
        console.error("Error to get hardware list:", error);
        res.status(500).json({
            message : "Error to get  hardware list"
        })
    }
})
app.delete('/api/hardware/:id', async (req,res) => {
    try {
        const id = req.params.id;   
        await Hardware.findByIdAndDelete(id);
        res.status(200).json({
            message : "Hardware deleted successfully"
        })

        
    }
    catch(error) {
        console.error("Error to delete hardware:", error);
        res.status(500).json({
            message : "Error to delete hardware"
        })
    }
})

app.post('/api/hardware', async (req,res) => {
    try {
        const saveHardware = new Hardware(req.body);
        const result = await saveHardware.save();

        res.status(201).json({
            message : "Hardware added successfully",
            data : result
        })

    }
    catch(error) {
        console.error("Error adding hardware:", error);
        res.status(500).json({
            message : "Error adding hardware"
        })
    }
});

app.put('/api/hardware/:id', async (req,res) => {
    try{
        const { quantity } = req.body;
        const updateHardware = await Hardware.findByIdAndUpdate(req.params.id, 
            { name : req.body.name, category : req.body.category, quantity : quantity, modelPath : req.body.modelPath },
            { returnDocument : "after" }
        );
        res.status(200).json({
            message : "Hardware updated successfully",
            data : updateHardware
        });
    }
    catch(error) {
        console.error("Error updating hardware:", error);
        res.status(500).json({
            message : "Error updating hardware"
        })
    }
})

 app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});