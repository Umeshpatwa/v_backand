const productModel = require('../models/productModel');


// Create product
exports.createProduct =  (req, res) => {
  const { name, description, price, category} = req.body;
  const image = req.file ? req.file.path : null;

  productModel.createProduct({ name, description, price, category, image}, (err, result) => {
    console.log(err,result)
    if (err) {
      return res.status(500).json({ error: 'Error creating product' });
    }
    res.status(201).json({ message: 'Product created successfully', result });
  });
};

// Get all products
exports.getAllProducts = (req, res) => {
  productModel.getAllProducts((err, products) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching products' });
    }
    const fullProducts = products.map(product => ({
      ...product,
      image: product.image
        ? `${req.protocol}://${req.get('host')}/${product.image.replace(/\\/g, '/')}`
        : null
    }));
    res.status(200).json(fullProducts);
  });
};

// Get a product by ID
exports.getProductById = (req, res) => {
  const { id } = req.params;
  productModel.getProductById(id, (err, product) => {
    if (err || !product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const fullProduct = {
      ...product,
      image: product.image 
        ? `${req.protocol}://${req.get('host')}/${product.image.replace(/\\/g, '/')}`
        : null 
    };
    res.status(200).json(fullProduct);
  });
};

// Update product
exports.updateProduct =  (req, res) => {
  const { id } = req.params;
  const { name, description, price, category} = req.body;
  const image = req.file ? req.file.path : null;

  productModel.updateProduct(id, { name, description, price, category, image }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error updating product'},err.json);
    }
    res.status(200).json({ message: 'Product updated successfully', result });
  });
};

// Delete product
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  productModel.deleteProduct(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error deleting product' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  });
};

exports.searchProducts = (req, res) => { 
  const { keyword } = req.query; 

  if (!keyword) {
    return res.status(400).json({ error: 'Search keyword is required' });
  }

  productModel.searchProducts(keyword, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error searching products' });
    }

    const products = results.map(product => ({
      ...product,
      image: product.image
        ? `${req.protocol}://${req.get('host')}/${product.image.replace(/\\/g, '/')}`
        : null
    }));

    res.status(200).json(products);
  });
};