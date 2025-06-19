// models/productModel.js
const db = require('../config/db');

module.exports = {
  // Create product
  createProduct: (product, callback) => {
    const { name, description, price, category, image } = product;
    const sql = `INSERT INTO products (name, description, price, category, image) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [name, description, price, category, image], callback);
  },

  // Get all products
  getAllProducts: (callback) => {
    db.query('SELECT * FROM products', callback);
  },

  // Get one product by ID
  getProductById: (id, callback) => {
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
      if (err) {
        return callback(err, null);  // Handle database error
      }
      if (results.length === 0) {
        return callback(new Error('Product not found'), null);
      }
      return callback(null, results[0]);
    });
  },

  // Update product
  updateProduct: (id, data, callback) => {
    const sql = 'UPDATE products SET name = ?, description = ?, price = ?, category = ?, image = ? WHERE id = ?';
    const values = [data.name, data.description, data.price, data.category, data.image, id];
    db.query(sql, values, callback);
  },

  // Delete product
  deleteProduct: (id, callback) => {
    db.query('DELETE FROM products WHERE id = ?', [id], callback);
  },

  searchProducts: (keyword, callback) => {
    const query = `
      SELECT * FROM products 
      WHERE name LIKE ? OR category LIKE ?
    `;
    const searchTerm = `%${keyword}%`;
    db.query(query, [searchTerm, searchTerm], (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  }

};