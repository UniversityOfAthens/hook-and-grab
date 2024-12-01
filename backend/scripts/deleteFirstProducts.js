const Product = require('../models/Product');

Product.getAll((err, products) => {
  if (err) {
    console.error('Error fetching products:', err);
    return;
  }

  if (products.length > 0) {
    const firstProduct = products[0];
    Product.deleteById(firstProduct.id, (err) => {
      if (err) {
        console.error(`Error deleting product with ID ${firstProduct.id}:`, err);
      } else {
        console.log(`Product with ID ${firstProduct.id} deleted successfully.`);
      }
    });
  } else {
    console.log('No products found to delete.');
  }
});