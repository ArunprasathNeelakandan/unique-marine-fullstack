const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { initializeDbAndServer } = require("../db");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const uploadFile = async (req, res) => {
  const { serialNumber } = req.body;
  const fileName = req.file.filename;
  const filePath = `/uploads/${fileName}`;
  const fullPath = path.join(__dirname, `../${filePath}`);

  if (!req.file || !serialNumber) {
    return res
      .status(400)
      .json({ message: "Both serial number and file are required." });
  }

  try {
    const db = await initializeDbAndServer();

    const existingImage = await db.get(
      "SELECT * FROM images WHERE serial_number = ?",
      [serialNumber]
    );

    if (existingImage) {
      fs.unlink(fullPath, (deleteErr) => {
        if (deleteErr) console.error("Failed to delete file:", deleteErr);
      });
      return res
        .status(400)
        .json({
          message: `Serial number ${serialNumber} already exists in the database.`,
        });
    }

    await db.run(
      "INSERT INTO images (serial_number, file_path) VALUES (?, ?)",
      [serialNumber, filePath]
    );

    res.status(200).json({
      message: "File uploaded successfully",
      serialNumber,
      file: req.file,
      filePath: filePath,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error storing image data in the database" });
  }
};


const getAllImages = async (req, res) => {
  const { page, limit } = req.query;
  const offset = (page - 1) * limit;

  const db = await initializeDbAndServer();
  const rows = await db.all(
    "SELECT * FROM images ORDER BY serial_number_add_time DESC LIMIT ? OFFSET ?",
    [limit, offset]
  );
  const totalImages = await db.get("SELECT COUNT(*) AS count FROM images");
  if (!rows || !totalImages) {
    return req.json({message:'Data base Error'})
  }
  res.json({
    images: rows,
    totalImages: totalImages.count,
  });

 
};

const sendImageBySerialNumber = async (req, res) => {
  const { serialNumber } = req.body;
  if (!serialNumber) {
    return res.status(400).json({ message: "serial number not found" });
  }
  const db = await initializeDbAndServer();
  const quary = "SELECT file_path FROM images WHERE serial_number = ?";
  const result = await db.get(quary, [serialNumber]);
  if (!result) {
    return res.status(400).json({ message: "Certicate not found" });
  }

  res.json(result);
};

const deleteImageBySerialNumber = async (req, res) => {
  const { serialNumber } = req.body;

  const db = await initializeDbAndServer();
  const query = `SELECT file_path FROM images WHERE serial_number = ?`;
  const deleteDbQuery = `DELETE FROM images WHERE serial_number = ?`;

  const fileData = await db.get(query, [serialNumber]);

  if (!fileData) {
    return res.status(404).json({ message: "Image not found" });
  }

  const file_path = fileData.file_path;

  const fullPath = path.join(__dirname, `..${file_path}`); // Ensure the correct file path is used
  await db.run(deleteDbQuery, [serialNumber]);

  fs.unlink(fullPath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      return res.status(500).json({ error: "Failed to delete file" });
    }

    res.json({ message: "File deleted successfully" });
  });
};

module.exports = {
  upload,
  uploadFile,
  getAllImages,
  sendImageBySerialNumber,
  deleteImageBySerialNumber,
};
