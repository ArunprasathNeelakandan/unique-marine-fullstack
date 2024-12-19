// fileRouter.js
const express = require('express');
const fileController = require('../controllers/fileController');
const authenticateToken = require('../middleware/auth');

const router = express.Router();

// Route for uploading files
router.post('/upload', authenticateToken, fileController.upload.single('file'), fileController.uploadFile);
router.get('/images',authenticateToken, fileController.getAllImages);
router.post('/images', fileController.sendImageBySerialNumber);
router.delete('/images', authenticateToken, fileController.deleteImageBySerialNumber);

module.exports = router;
