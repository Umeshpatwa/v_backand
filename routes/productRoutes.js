const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });
// Get all products
router.get('/', productController.getAllProducts);
// search product
router.get('/search', productController.searchProducts);

// Create product
router.post('/',upload.single('image'), productController.createProduct);

// Get product by ID
router.get('/:id', productController.getProductById);

// Update product
router.post('/:id',upload.single('image'), productController.updateProduct);

// Delete product
router.delete('/:id', productController.deleteProduct);



module.exports = router;
